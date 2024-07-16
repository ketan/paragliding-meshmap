// do this first
import 'dotenv/config'

//
import { AppDataSource } from '#config/data-source'
import { mqttProcessor } from '#mqtt/main'
import { MQTTCLIOptions, mqttCLIParse } from './helpers/cli.js'

const cliOptions: MQTTCLIOptions = mqttCLIParse()

await AppDataSource.initialize()
await AppDataSource.runMigrations({ transaction: 'each' })

mqttProcessor(cliOptions)
