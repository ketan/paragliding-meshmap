import mqtt from 'async-mqtt'
import PQueue from 'p-queue'
import pRetry from 'p-retry'
import { processMessage } from './mqtt/decoder.js'
import { CLIOptions, cliParse } from './mqtt/mqtt-cli.js'
import { AppDataSource } from './data-source.js'
import debug from 'debug'

const logger = debug('meshmap:mqtt')

const cliOptions: CLIOptions = cliParse()

await AppDataSource.initialize()

await AppDataSource.runMigrations({ transaction: 'each' })

const client = mqtt.connect(cliOptions.mqttBrokerUrl, {
  username: cliOptions.mqttUsername,
  password: cliOptions.mqttPassword,
})

const queue = new PQueue({
  concurrency: 1,
})

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
