// do this first
import 'newrelic'
// then dotenv
import 'dotenv-flow/config'

//
import { mqttProcessor } from '#mqtt/main'
import { MQTTCLIOptions, mqttCLIParse } from '#helpers/cli'
import { AppDataSource } from '#config/data-source'

const cliOptions: MQTTCLIOptions = mqttCLIParse()

const db = await AppDataSource.initialize()
await AppDataSource.runMigrations({
  transaction: 'each',
})

await mqttProcessor(db, cliOptions)
