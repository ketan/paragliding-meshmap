// do this first
import 'dotenv/config'

//
import { connString, dbConnectionConcurrency } from '#config/conn-string'
import { AppDataSource } from '#config/data-source'
import { mqttProcessor } from '#mqtt/main'
import { createDatabase } from 'typeorm-extension'
import { MQTTCLIOptions, mqttCLIParse } from './helpers/cli.js'

const cliOptions: MQTTCLIOptions = mqttCLIParse()

await createDatabase({ options: connString })
await AppDataSource.initialize()
await AppDataSource.runMigrations({ transaction: 'each' })

mqttProcessor(cliOptions, dbConnectionConcurrency)
