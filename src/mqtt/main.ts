import { Database } from '#config/data-source'
import { errLog, perfLog } from '#helpers/logger'
import { processMessage } from '#mqtt/decoder'
import { dumpStats, purgeData } from '#mqtt/mqtt-orm'
import mqtt from 'async-mqtt'
import debug from 'debug'
import PQueue from 'p-queue'
import pRetry from 'p-retry'
import { MQTTCLIOptions } from '../helpers/cli.js'

export function mqttProcessor(db: Database, cliOptions: MQTTCLIOptions) {
  const logger = debug('meshmap:mqtt')
  logger.enabled = true

  logger(`Starting mqtt with options`, cliOptions)

  const client = mqtt.connect(cliOptions.mqttBrokerUrl, {
    username: cliOptions.mqttUsername,
    password: cliOptions.mqttPassword,
  })

  const queue = new PQueue({
    concurrency: 5,
  })

  if (cliOptions.dumpStatsEvery) {
    setInterval(() => {
      dumpStats(db, logger)
    }, cliOptions.dumpStatsEvery.as('millisecond'))
    dumpStats(db, logger)
  }

  if (cliOptions.purgeEvery) {
    logger(`Purging data older than ${cliOptions.purgeDataOlderThan.toHuman()} every ${cliOptions.purgeEvery.toHuman()}`)
    setInterval(async () => {
      await purgeData(db, cliOptions, logger)
    }, cliOptions.purgeEvery.as('millisecond'))
  }
  purgeData(db, cliOptions, logger)

  client.on('connect', async () => {
    logger(`Connected to ${cliOptions.mqttBrokerUrl}`)
    await client.subscribe(cliOptions.mqttTopic)
    logger(`Subscribed to ${cliOptions.mqttTopic}`)
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
    queue.add(() => handleMessageWithRetry(topic, payload))
  })
}
