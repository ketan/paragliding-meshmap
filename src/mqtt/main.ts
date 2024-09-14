import { errLog, flyXCLog, perfLog } from '#helpers/logger'
import { processMessage } from '#mqtt/decoder'
import { dumpStats, purgeData } from '#mqtt/mqtt-orm'
import mqtt from 'async-mqtt'
import debug from 'debug'
import pRetry from 'p-retry'
import { MQTTCLIOptions } from '#helpers/cli'
import PQueue from 'p-queue'
import os from 'os'
import { DataSource } from 'typeorm'
import { Configs } from '#entity/configs'
import { pgBoss } from '#config/data-source'
import _ from 'lodash'
import { sendTelegramMessage } from '#helpers/utils'

async function flyXCJobProcessor() {
  await pgBoss.createQueue('fly-xc', {
    retryLimit: 3,
    retryBackoff: true,
    retryDelay: 30,
    name: 'fly-xc',
  })

  pgBoss.work(
    'fly-xc',
    {
      batchSize: 10,
      pollingIntervalSeconds: 10,
    },
    async (jobs) => {
      const flyXCApiKey = process.env.FLYXC_API_KEY
      const flyXCApiUrl = process.env.FLYXC_API_URL

      if (flyXCApiKey && flyXCApiUrl) {
        return await Promise.all(
          jobs.map(async (job) => {
            flyXCLog(`Picked up job`, job.data)
            const requestHeaders = {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }

            const response = await fetch(flyXCApiUrl, {
              method: 'POST',
              headers: _.assign(
                {
                  Authorization: `Bearer ${flyXCApiKey}`,
                },
                requestHeaders
              ),
              body: JSON.stringify(job.data),
            })
            flyXCLog(`Sending job to ${flyXCApiUrl}`)
            flyXCLog({ requestHeaders })
            flyXCLog({ body: JSON.stringify(job.data) })
            flyXCLog(`Response`, response)

            if (
              response.status === 200 || // all ok
              response.status === 400 || // ignore, probably some bad data that we're sending
              response.status == 401 || // authentication error, nothing we can do to fix
              response.status == 403 // ignore, auth error, nothing we can do to fix
            ) {
              flyXCLog(`Job sent`, response.status)
              return await response.text()
            } else if (response.status === 429) {
              errLog(`Rate limited, retrying`, response)
              // rate limited, retry
              throw 'Rate limited, retry'
            } else {
              errLog(`Failed to send data. Got a non-200 response`, response)
              throw 'Failed to send data. Got a non-200 response'
            }
          })
        )
      }
    }
  )
}

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
  const logger = debug('meshmap:mqtt')
  logger.enabled = true

  logger(`Starting mqtt with options`, cliOptions)

  const clientIdConfig = await Configs.mqttClientId(db)

  await pgBoss.start()

  await telegramJobProcessor()
  await flyXCJobProcessor()

  const clientId = clientIdConfig.value!.toString()
  const client = mqtt.connect(cliOptions.mqttBrokerUrl, {
    username: cliOptions.mqttUsername,
    password: cliOptions.mqttPassword,
    clientId: clientId,
  })

  client.on('connect', async () => {
    logger(`Connected to ${cliOptions.mqttBrokerUrl} using client id ${clientId}`)
    client.subscribe(cliOptions.mqttTopics)
    logger(`Subscribed to `, cliOptions.mqttTopics)
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
      await dumpStats(db, logger)
    }, cliOptions.dumpStatsEvery.as('millisecond'))
    await dumpStats(db, logger)
  }

  if (cliOptions.purgeEvery) {
    logger(`Purging data older than ${cliOptions.purgeDataOlderThan.toHuman()} every ${cliOptions.purgeEvery.toHuman()}`)
    setInterval(async () => {
      await purgeData(db, cliOptions, logger)
    }, cliOptions.purgeEvery.as('millisecond'))
  }
  await purgeData(db, cliOptions, logger)
}
