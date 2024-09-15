import { AbortError } from 'p-retry'
import { flyXCLog, protobufDecode, telegramLog } from '#helpers/logger'
import { pgBoss } from '#config/data-source'
import { NodeNameAttributes } from '../../frontend/src/nodes-entity.js'
import _ from 'lodash'
import escape from 'escape-html'

export const BROADCAST_ADDR = Number('0xffffffff')

export function toBigInt(str: number | string | undefined | null): number | undefined {
  if (typeof str === 'number') {
    return str
  }

  if (str === undefined || str === null || str.trim().length === 0) {
    return
  }

  const hexVal = str.replace('!', '').replaceAll('\0', '')
  let returnValue
  if (hexVal.startsWith('0x')) {
    returnValue = Number(hexVal)
  } else {
    returnValue = Number('0x' + hexVal)
  }

  if (isNaN(returnValue)) {
    return
  } else {
    return returnValue
  }
}

export function secondsAgo(secs: number) {
  return new Date(Date.now() - secs * 1000)
}

export function parseProtobuf<T>(f: () => T): T {
  try {
    const protobuf = f()
    protobufDecode(protobuf)
    return protobuf
  } catch (e: unknown) {
    if (typeof e === 'string' || e instanceof Error) {
      throw new AbortError(e)
    } else if (e) {
      throw new AbortError((e as object).toString())
    } else {
      throw new AbortError(`Unknown error parsing protobuf`)
    }
  }
}

export async function sendToFlyXC(payload: object) {
  const flyXCApiKey = process.env.FLYXC_API_KEY
  const flyXCApiUrl = process.env.FLYXC_API_URL

  if (flyXCApiKey && flyXCApiUrl) {
    flyXCLog('Sending to FlyXC')
    await pgBoss.send('fly-xc', payload)
    flyXCLog('Sent to FlyXC')
  }
}

export function nodeName(node: Partial<NodeNameAttributes>) {
  return _.compact([node.shortName, node.longName, node.nodeId, node.nodeIdHex]).at(0)?.toString() || '<NO NAME>'
}

export async function sendToTelegram(nodeName: string, text: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (botToken && chatId) {
    telegramLog('Sending to Telegram')
    await pgBoss.send('telegram', { from: nodeName, message: text })
    telegramLog('Sent to Telegram')
  }
}

export async function sendTelegramMessage(botToken: string, chatId: string, threadId: string, from: string, message: string) {
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`

  const formattedText = `<strong>${from}</strong> says\n<blockquote>${escape(message)}</blockquote>`

  const body: object = {
    chat_id: chatId,
    text: formattedText,
    message_thread_id: threadId,
    parse_mode: 'HTML',
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Telegram API error: ${error}`)
  }

  await response.json()
}
