import { errLog, mqttLogger, perfLog } from '#helpers/logger'
import { processMessage } from '#mqtt/decoder'
import { purgeData } from '#mqtt/mqtt-orm'
import mqtt from 'async-mqtt'
import pRetry from 'p-retry'
import { MQTTCLIOptions } from '#helpers/cli'
import PQueue from 'p-queue'
import os from 'os'
import { DataSource } from 'typeorm'
import { Configs } from '#entity/configs'
import { pgBoss } from '#config/data-source'
import { flyXCJobProcessor } from '#helpers/fly-xc'
import { sendTelegramMessage } from '#helpers/telegram'
import { pureTrackIOJobProcessor } from '#helpers/pure-track'
import { dumpStats } from '#helpers/stats'

async function telegramJobProcessor() {
  await pgBoss.createQueue('telegram', {
    retryLimit: 3,
    retryBackoff: true,
    retryDelay: 30,
    name: 'telegram',
  })

  pgBoss.work<{ from: string; message: string }>(
    'telegram',
    {
      batchSize: 10,
      pollingIntervalSeconds: 10,
    },
    async (jobs) => {
      const botToken = process.env.TELEGRAM_BOT_TOKEN
      const chatId = process.env.TELEGRAM_CHAT_ID
      const msgThreadId = process.env.TELEGRAM_MESSAGE_THREAD_ID

      if (!botToken || !chatId || !msgThreadId) {
        throw new Error('Telegram bot token or chat ID or thread id is not set')
      }

      for (const job of jobs) {
        await sendTelegramMessage(botToken, chatId, msgThreadId, job.data.from, job.data.message)
      }
    }
  )
}

export async function mqttProcessor(db: DataSource, cliOptions: MQTTCLIOptions) {
  mqttLogger.enabled = true

  mqttLogger(`Starting mqtt with options`, cliOptions)

  const clientIdConfig = await Configs.mqttClientId(db)

  await telegramJobProcessor()
  await flyXCJobProcessor()
  await pureTrackIOJobProcessor()

  const clientId = clientIdConfig.value!.toString()
  const client = mqtt.connect(cliOptions.mqttBrokerUrl, {
    username: cliOptions.mqttUsername,
    password: cliOptions.mqttPassword,
    clientId: clientId,
  })

  client.on('connect', async () => {
    mqttLogger(`Connected to ${cliOptions.mqttBrokerUrl} using client id ${clientId}`)
    client.subscribe(cliOptions.mqttTopics)
    mqttLogger(`Subscribed to `, cliOptions.mqttTopics)
  })

  const queue = new PQueue({
    concurrency: Number(process.env.DB_CONNECTION_CONCURRENCY) || os.cpus().length,
  })

  let messageId = 0

  async function handleMessageWithRetry(topic: string, payload: Buffer) {
    messageId++
    perfLog(`Begin msg - ${messageId} - ${topic}`)

    try {
      await pRetry(() => processMessage(db, cliOptions, topic, payload), {
        retries: 2,
        randomize: true,
        minTimeout: 100,
        maxTimeout: 1000,
      })
    } catch (e) {
      if (e instanceof RangeError || (e.message && (e.message as string).includes('invalid wire type'))) {
        // ignore
      } else {
        errLog(`ignoring payload`, { err: e, topic, payload })
      }
    }
    perfLog(`End msg - ${messageId}`)
  }

  client.on('message', async (topic, payload) => {
    await queue.add(() => handleMessageWithRetry(topic, payload))
  })

  if (cliOptions.dumpStatsEvery) {
    setInterval(async () => {
      await dumpStats(db, mqttLogger)
    }, cliOptions.dumpStatsEvery.as('millisecond'))
    await dumpStats(db, mqttLogger)
  }

  if (cliOptions.purgeEvery) {
    mqttLogger(`Purging data older than ${cliOptions.purgeDataOlderThan.toHuman()} every ${cliOptions.purgeEvery.toHuman()}`)
    setInterval(async () => {
      await purgeData(db, cliOptions, mqttLogger)
    }, cliOptions.purgeEvery.as('millisecond'))
  }
  await purgeData(db, cliOptions, mqttLogger)
}
