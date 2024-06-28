import { Command, InvalidArgumentError } from 'commander'
// import commandLineArgs from 'command-line-args'
// import commandLineUsage from 'command-line-usage'
// originally authored by Liam Cottle (https://github.com/liamcottle/meshtastic-map)

function myParseInt(value: string) {
  // parseInt takes a string and a radix
  const parsedValue = parseInt(value, 10)
  if (isNaN(parsedValue)) {
    throw new InvalidArgumentError('Not a number.')
  }
  return parsedValue
}

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
  program.option('--purge-interval-seconds <interval>', 'How long to wait between each automatic database purge.', myParseInt, 3600)
  program.option(
    '--purge-device-metrics-after-seconds <interval>',
    'Device Metrics older than this many seconds will be purged from the database.',
    myParseInt,
    3600
  )
  program.option(
    '--purge-environment-metrics-after-seconds <interval>',
    'Environment Metrics older than this many seconds will be purged from the database.',
    myParseInt,
    3600
  )
  program.option(
    '--purge-power-metrics-after-seconds <interval>',
    'Power Metrics older than this many seconds will be purged from the database.',
    myParseInt,
    3600
  )
  program.option(
    '--purge-nodes-unheard-for-seconds <interval>',
    "Nodes that haven't been heard from in this many seconds will be purged from the database.",
    myParseInt,
    3600
  )
  program.option(
    '--purge-positions-after-seconds <interval>',
    'Positions older than this many seconds will be purged from the database.',
    myParseInt,
    3600
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
  purgeIntervalSeconds: number
  purgeDeviceMetricsAfterSeconds: number
  purgeEnvironmentMetricsAfterSeconds: number
  purgePowerMetricsAfterSeconds: number
  purgeNodesUnheardForSeconds: number
  purgePositionsAfterSeconds: number
}
