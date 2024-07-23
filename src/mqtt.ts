// do this first
import 'dotenv/config'

//
import { createDB, Database } from '#config/data-source'
import { mqttProcessor } from '#mqtt/main'
import { MQTTCLIOptions, mqttCLIParse } from './helpers/cli.js'

const cliOptions: MQTTCLIOptions = mqttCLIParse()

const db: Database = createDB(cliOptions.purgeDataOlderThan)

mqttProcessor(db, cliOptions)
