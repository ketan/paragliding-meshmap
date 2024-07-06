import { Command, InvalidArgumentError } from 'commander'
import { Duration } from 'luxon'
// import commandLineArgs from 'command-line-args'
// import commandLineUsage from 'command-line-usage'
// originally authored by Liam Cottle (https://github.com/liamcottle/meshtastic-map)

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

export function cliParse() {
  const program = new Command()
  program.showHelpAfterError()
  program.option('--mqtt-broker-url <URL>', 'MQTT Broker URL (e.g: mqtt://mqtt.meshtastic.org)', 'mqtt://mqtt.meshtastic.org')
  program.option('--mqtt-username <USERNAME>', 'MQTT Username(e.g: meshdev)', 'meshdev')
  program.option('--mqtt-password <PASSWORD>', 'MQTT Password (e.g: large4cats)', 'large4cats')
  program.option('--mqtt-topic <TOPIC>', 'MQTT Topic to subscribe to (e.g: msh/#)', '#')
  program.option('--no-collect-service-envelopes', 'This option will save all received service envelopes to the database.')
  program.option('--no-collect-positions', 'This option will save all received positions to the database.')
  program.option('--no-collect-text-messages', 'This option will save all received text messages to the database.')
  program.option('--no-collect-waypoints', 'This option will save all received waypoints to the database.')
  program.option('--no-collect-neighbour-info', 'This option will save all received neighbour infos to the database.')
  program.option('--no-collect-map-reports', 'This option will save all received map reports to the database.')
  program.option('--decryption-keys <keys...>', 'Decryption keys encoded in base64 to use when decrypting service envelopes.', [
    '1PG7OiApB1nwvP+rz05pAQ==',
  ])

  program.option(
    '--purge-every <duration>',
    'How long to wait between each automatic database purge (duration format https://en.wikipedia.org/wiki/ISO_8601#Durations).',
    parseDuration,
    defaultDuration
  )
  program.option(
    '--purge-device-metrics-older-than <duration>',
    'Device Metrics older than this many seconds will be purged from the database (duration format https://en.wikipedia.org/wiki/ISO_8601#Durations).',
    parseDuration,
    defaultDuration
  )
  program.option(
    '--purge-environment-metrics-older-than <duration>',
    'Environment Metrics older than this many seconds will be purged from the database (duration format https://en.wikipedia.org/wiki/ISO_8601#Durations).',
    parseDuration,
    defaultDuration
  )
  program.option(
    '--purge-power-metrics-older-than <duration>',
    'Power Metrics older than this many seconds will be purged from the database (duration format https://en.wikipedia.org/wiki/ISO_8601#Durations).',
    parseDuration,
    defaultDuration
  )
  program.option(
    '--purge-nodes-unheard-older-than <duration>',
    "Nodes that haven't been heard from in this many seconds will be purged from the database (duration format https://en.wikipedia.org/wiki/ISO_8601#Durations).",
    parseDuration,
    defaultDuration
  )
  program.option(
    '--purge-positions-older-than <duration>',
    'Positions older than this many seconds will be purged from the database (duration format https://en.wikipedia.org/wiki/ISO_8601#Durations).',
    parseDuration,
    defaultDuration
  )

  program.parse()
  return program.opts() as CLIOptions
}

export interface CLIOptions {
  mqttBrokerUrl: string
  mqttUsername: string
  mqttPassword: string
  mqttTopic: string
  collectServiceEnvelopes: true
  collectPositions: true
  collectTextMessages: true
  collectWaypoints: true
  collectNeighbourInfo: true
  collectMapReports: true
  decryptionKeys: string[]
  purgeEvery: Duration
  purgeDeviceMetricsOlderThan: Duration
  purgeEnvironmentMetricsOlderThan: Duration
  purgePowerMetricsOlderThan: Duration
  purgeNodesUnheardOlderThan: Duration
  purgePositionsOlderThan: Duration
}
