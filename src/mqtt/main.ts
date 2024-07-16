import { processMessage } from '#mqtt/decoder'
import { MQTTCLIOptions } from '../helpers/cli.js'
import { purgeData } from '#mqtt/mqtt-orm'
import mqtt from 'async-mqtt'
import debug from 'debug'
import PQueue from 'p-queue'
import pRetry from 'p-retry'

export function mqttProcessor(cliOptions: MQTTCLIOptions) {
  const logger = debug('meshmap:mqtt')
  logger.enabled = true

  const client = mqtt.connect(cliOptions.mqttBrokerUrl, {
    username: cliOptions.mqttUsername,
    password: cliOptions.mqttPassword,
  })

  const queue = new PQueue({
    concurrency: 1,
  })

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
      logger(`Ignoring payload`, e)
    }
  }


  client.on('message', async (topic, payload) => {
    console.log(`message`)
    queue.add(async () => handleMessageWithRetry(topic, payload))
  })
}
