import mqtt from 'mqtt'
import PQueue from 'p-queue'
import pRetry from 'p-retry'
import { processMessage } from './mqtt/decoder.js'
import { CLIOptions, cliParse } from './mqtt/mqtt-cli.js'
import { AppDataSource } from './data-source.js'

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

client.on('connect', () => {
  client.subscribe(cliOptions.mqttTopic)
})

async function handleMessageWithRetry(topic: string, payload: Buffer) {
  try {
    await pRetry(() => processMessage(cliOptions, topic, payload), {
      retries: 5,
      onFailedAttempt: async (err) => {
        console.log(`Failed`, err)
      },
    })
  } catch (e) {
    console.log(`ignoring `, e)
  }
}

client.on('message', async (topic, payload) => {
  queue.add(async () => handleMessageWithRetry(topic, payload))
})
