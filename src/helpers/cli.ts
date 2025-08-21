import { Command, InvalidArgumentError, ParseOptions } from 'commander'
import { Duration } from 'luxon'

function parseDuration(value: string) {
  const duration = Duration.fromISO(value.toUpperCase())

  if (duration.isValid) {
    return duration
  } else {
    throw new InvalidArgumentError(
      `${value} cannot be parsed as a duration. See https://en.wikipedia.org/wiki/ISO_8601#Durations for some examples.`
    )
  }
}

const defaultDuration = Duration.fromISO('P7D')

function nodeFilter(value: string, previous: NodeFilter) {
  let nodeId: number | string | RegExp

  if (value.startsWith('0x') && !isNaN(Number(value))) {
    nodeId = Number(value)
  } else if (!isNaN(Number(value))) {
    nodeId = Number(value)
  } else if (value.startsWith('/') && value.endsWith('/')) {
    nodeId = new RegExp(value.slice(1, -1))
  } else {
    nodeId = value
  }

  return previous.concat(nodeId)
}

export function addOpts(command: Command) {
  command.option('--mqtt-broker-url <URL>', 'MQTT Broker URL (e.g: mqtt://mqtt.meshtastic.org)', 'mqtt://mqtt.meshtastic.org')
  command.option('--mqtt-username <USERNAME>', 'MQTT Username(e.g: meshdev)', 'meshdev')
  command.option('--mqtt-password <PASSWORD>', 'MQTT Password (e.g: large4cats)', 'large4cats')
  command.option('--mqtt-topics <topics...>', 'MQTT Topic to subscribe to (e.g: msh/#, msh/IN/#)', ['msh/#'])
  command.option('--decryption-keys <keys...>', 'Decryption keys encoded in base64 to use when decrypting service envelopes.', [
    '1PG7OiApB1nwvP+rz05pAQ==',
  ])

  command.option(
    '--purge-every <duration>',
    'How long to wait between each automatic database purge (duration format https://en.wikipedia.org/wiki/ISO_8601#Durations).',
    parseDuration,
    Duration.fromISO('PT10M')
  )
  command.option(
    '--purge-data-older-than <duration>',
    'Data older than this duration will be purged from the database (duration format https://en.wikipedia.org/wiki/ISO_8601#Durations).',
    parseDuration,
    defaultDuration
  )
  command.option(
    '--dump-stats-every <duration>',
    'Dump stats at specified intervals (duration format https://en.wikipedia.org/wiki/ISO_8601#Durations)',
    parseDuration,
    Duration.fromISO('PT5M')
  )

  command.option('--collect-service-envelopes', 'Whether to collect service envelopes', false)

  command.option(
    '--dedupe-duration <duration>',
    'Dedupe similar packets received over MQTT that were received within this duration (duration format https://en.wikipedia.org/wiki/ISO_8601#Durations)',
    parseDuration,
    Duration.fromISO('PT30S')
  )

  command.option(
    '--filter-node-forwarding <nodes...>',
    'Do not share the data for the specified nodes (this can include a node ID in decimal or hexadecimal format prefixed with 0x, or a short or long name using regex) with external services.',
    nodeFilter,
    new Array<number>()
  )

  command.option('--auto-partition', 'Automatically partition the database to improve performance', true)
}

export function webCLIParse(argv?: readonly string[], parseOptions?: ParseOptions) {
  const program = new Command()
  program.showHelpAfterError()
  program.option('--no-mqtt', 'Disable MQTT listener. Other MQTT options do not have an effect if MQTT is disabled.')

  addOpts(program)

  program.parse(argv, parseOptions)
  return program.opts() as WebCLIOptions
}

export function mqttCLIParse(argv?: readonly string[], parseOptions?: ParseOptions) {
  const program = new Command()
  program.showHelpAfterError()

  addOpts(program)

  program.parse(argv, parseOptions)
  return program.opts() as MQTTCLIOptions
}

export type NodeFilter = (number | string | RegExp)[]

export interface MQTTCLIOptions {
  mqttBrokerUrl: string
  mqttUsername: string
  mqttPassword: string
  mqttTopics: string[]
  decryptionKeys: string[]
  purgeEvery: Duration
  purgeDataOlderThan: Duration
  dumpStatsEvery: Duration
  collectServiceEnvelopes: boolean
  dedupeDuration: Duration
  filterNodeForwarding: NodeFilter
  autoPartition: boolean
}

export interface WebCLIOptions extends MQTTCLIOptions {
  mqtt: boolean
}
