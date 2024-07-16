// do this first
import 'dotenv/config'

//
import { mqttProcessor } from '#mqtt/main'
import { MQTTCLIOptions, mqttCLIParse } from './helpers/cli.js'

const cliOptions: MQTTCLIOptions = mqttCLIParse()

mqttProcessor(cliOptions)
