import { errLog, perfLog } from '#helpers/logger'
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

export async function mqttProcessor(db: DataSource, cliOptions: MQTTCLIOptions) {
  const logger = debug('meshmap:mqtt')
  logger.enabled = true

  logger(`Starting mqtt with options`, cliOptions)

  const clientIdConfig =
    (await Configs.byName(db, 'mqttClientId')) ||
    new Configs({
      key: 'mqttClientId',
      value: 'paragliding-meshmap-' + Math.random().toString(16).substring(2, 8),
    })

  if (!clientIdConfig.id) {
    await clientIdConfig.save(db)
  }

  const clientId = clientIdConfig.value!.toString()
  const client = mqtt.connect(cliOptions.mqttBrokerUrl, {
    username: cliOptions.mqttUsername,
    password: cliOptions.mqttPassword,
    clientId: clientId,
  })

  client.on('connect', async () => {
    logger(`Connected to ${cliOptions.mqttBrokerUrl} using client id ${clientId}`)
    await client.subscribe(cliOptions.mqttTopic)
    logger(`Subscribed to ${cliOptions.mqttTopic}`)
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
