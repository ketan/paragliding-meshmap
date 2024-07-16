import { AppDataSource } from '#config/data-source'
import { processMessage } from '#mqtt/decoder'
import { purgeData } from '#mqtt/mqtt-orm'
import mqtt from 'async-mqtt'
import debug from 'debug'
import PQueue from 'p-queue'
import pRetry from 'p-retry'
import { MQTTCLIOptions, mqttCLIParse } from './helpers/cli.js'

const logger = debug('meshmap:mqtt')

const cliOptions: MQTTCLIOptions = mqttCLIParse()

await AppDataSource.initialize()

await AppDataSource.runMigrations({ transaction: 'each' })

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
  await client.subscribe(cliOptions.mqttTopic)
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
  queue.add(async () => handleMessageWithRetry(topic, payload))
})
