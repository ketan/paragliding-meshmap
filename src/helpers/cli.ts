import { Command, InvalidArgumentError } from 'commander'
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

export function addOpts(command: Command) {
  command.option('--mqtt-broker-url <URL>', 'MQTT Broker URL (e.g: mqtt://mqtt.meshtastic.org)', 'mqtt://mqtt.meshtastic.org')
  command.option('--mqtt-username <USERNAME>', 'MQTT Username(e.g: meshdev)', 'meshdev')
  command.option('--mqtt-password <PASSWORD>', 'MQTT Password (e.g: large4cats)', 'large4cats')
  command.option('--mqtt-topic <TOPIC>', 'MQTT Topic to subscribe to (e.g: msh/#)', '#')
  command.option('--no-collect-service-envelopes', 'This option will save all received service envelopes to the database.')
  command.option('--no-collect-positions', 'This option will save all received positions to the database.')
  command.option('--no-collect-text-messages', 'This option will save all received text messages to the database.')
  command.option('--no-collect-waypoints', 'This option will save all received waypoints to the database.')
  command.option('--no-collect-neighbour-info', 'This option will save all received neighbour infos to the database.')
  command.option('--no-collect-map-reports', 'This option will save all received map reports to the database.')
  command.option('--decryption-keys <keys...>', 'Decryption keys encoded in base64 to use when decrypting service envelopes.', [
    '1PG7OiApB1nwvP+rz05pAQ==',
  ])

  command.option(
    '--purge-every <duration>',
    'How long to wait between each automatic database purge (duration format https://en.wikipedia.org/wiki/ISO_8601#Durations).',
    parseDuration,
    defaultDuration
  )
  command.option(
    '--purge-device-metrics-older-than <duration>',
    'Device Metrics older than this many seconds will be purged from the database (duration format https://en.wikipedia.org/wiki/ISO_8601#Durations).',
    parseDuration,
    defaultDuration
  )
  command.option(
    '--purge-environment-metrics-older-than <duration>',
    'Environment Metrics older than this many seconds will be purged from the database (duration format https://en.wikipedia.org/wiki/ISO_8601#Durations).',
    parseDuration,
    defaultDuration
  )
  command.option(
    '--purge-power-metrics-older-than <duration>',
    'Power Metrics older than this many seconds will be purged from the database (duration format https://en.wikipedia.org/wiki/ISO_8601#Durations).',
    parseDuration,
    defaultDuration
  )
  command.option(
    '--purge-nodes-unheard-older-than <duration>',
    "Nodes that haven't been heard from in this many seconds will be purged from the database (duration format https://en.wikipedia.org/wiki/ISO_8601#Durations).",
    parseDuration,
    defaultDuration
  )
  command.option(
    '--purge-positions-older-than <duration>',
    'Positions older than this many seconds will be purged from the database (duration format https://en.wikipedia.org/wiki/ISO_8601#Durations).',
    parseDuration,
    defaultDuration
  )
}

export function webCLIParse() {
  const program = new Command()
  program.showHelpAfterError()
  program.option('--no-mqtt', 'Disable MQTT listener. Other MQTT options do not have an effect if MQTT is disabled.')
  addOpts(program)
  program.parse()

  return program.opts() as WebCLIOptions
}

export function mqttCLIParse() {
  const program = new Command()
  program.showHelpAfterError()

  addOpts(program)

  program.parse()
  return program.opts() as MQTTCLIOptions
}

export interface MQTTCLIOptions {
  mqttBrokerUrl: string
  mqttUsername: string
  mqttPassword: string
  mqttTopic: string
  collectServiceEnvelopes: boolean
  collectPositions: boolean
  collectTextMessages: boolean
  collectWaypoints: boolean
  collectNeighbourInfo: boolean
  collectMapReports: boolean
  decryptionKeys: string[]
  purgeEvery: Duration
  purgeDeviceMetricsOlderThan: Duration
  purgeEnvironmentMetricsOlderThan: Duration
  purgePowerMetricsOlderThan: Duration
  purgeNodesUnheardOlderThan: Duration
  purgePositionsOlderThan: Duration
}

export interface WebCLIOptions extends MQTTCLIOptions {
  mqtt: boolean
}
