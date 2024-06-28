import mqtt from 'mqtt'
import PQueue from 'p-queue'
import pRetry from 'p-retry'
import { processMessage } from './mqtt/decoder.js'
import { CLIOptions, cliParse } from './mqtt/mqtt-cli.js'

const cliOptions: CLIOptions = cliParse()

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

client.on('message', async (topic, payload, _packet) => {
  queue.add(async () => await pRetry(() => processMessage(cliOptions, topic, payload), { retries: 5 }))
})
