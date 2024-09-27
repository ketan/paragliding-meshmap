import { telegramLog } from '#helpers/logger'
import { pgBoss } from '#config/data-source'
import escape from 'escape-html'
import Node from '#entity/node'
import { NodeNameAttributes } from '../../frontend/src/nodes-entity.js'
import _ from 'lodash'

export function nodeName(node: Partial<NodeNameAttributes>) {
  return _.compact([node.longName, node.shortName, node.nodeId, node.nodeIdHex]).at(0)?.toString() || '<NO NAME>'
}

export async function sendToTelegram(node: Node, text: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (botToken && chatId) {
    telegramLog('Sending to Telegram')
    await pgBoss.send('telegram', { from: nodeName(node), message: text })
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
