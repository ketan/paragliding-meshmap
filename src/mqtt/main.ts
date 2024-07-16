import { errLog } from '#helpers/logger'
import { processMessage } from '#mqtt/decoder'
import { dumpStats, purgeData } from '#mqtt/mqtt-orm'
import mqtt from 'async-mqtt'
import debug from 'debug'
import _ from 'lodash'
import { Duration } from 'luxon'
import PQueue from 'p-queue'
import pRetry from 'p-retry'
import { MQTTCLIOptions } from '../helpers/cli.js'

export async function mqttProcessor(cliOptions: MQTTCLIOptions) {
  const logger = debug('meshmap:mqtt')
  logger.enabled = true

  logger(`Starting mqtt with options`, cliOptions)

  const client = mqtt.connect(cliOptions.mqttBrokerUrl, {
    username: cliOptions.mqttUsername,
    password: cliOptions.mqttPassword,
  })

  const queue = new PQueue({
    concurrency: 1,
  })

  setInterval(() => {
    dumpStats(logger)
  }, Duration.fromISO(`PT10M`).toMillis())
  await dumpStats(logger)

  if (cliOptions.purgeEvery) {
    logger(`Purging data every ${cliOptions.purgeEvery.toHuman()}`)

    setInterval(async () => {
      logger(`Purging data now`)
      await purgeData(cliOptions)
    }, cliOptions.purgeEvery.as('millisecond'))
  }

  client.on('connect', async () => {
    logger(`Connected to ${cliOptions.mqttBrokerUrl}`)
    await client.subscribe(cliOptions.mqttTopic)
    logger(`Subscribed to ${cliOptions.mqttTopic}`)
  })

  async function handleMessageWithRetry(topic: string, payload: Buffer) {
    try {
      await pRetry(() => processMessage(cliOptions, topic, payload), {
        retries: 5,
      })
    } catch (e) {
      errLog(`ignoring payload`, e)
    }
  }

  client.on('message', async (topic, payload) => {
    queue.add(async () => handleMessageWithRetry(topic, payload))
  })
}
