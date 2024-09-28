import { webCLIParse } from '#helpers/cli'
import { expect } from 'chai'
import { Duration } from 'luxon'

describe('cli', () => {
  it('should return default values if no args', () => {
    expect(webCLIParse([], { from: 'user' })).to.deep.eq({
      mqtt: true,
      mqttBrokerUrl: 'mqtt://mqtt.meshtastic.org',
      mqttPassword: 'large4cats',
      mqttTopics: ['msh/#'],
      mqttUsername: 'meshdev',
      decryptionKeys: ['1PG7OiApB1nwvP+rz05pAQ=='],
      purgeEvery: Duration.fromISO('PT10M'),
      purgeDataOlderThan: Duration.fromISO('P7D'),
      dumpStatsEvery: Duration.fromISO('PT5M'),
      collectServiceEnvelopes: false,
      dedupeDuration: Duration.fromISO('PT30S'),
      filterNodeForwarding: [],
    })
  })

  it('should parse --no-mqtt arg', () => {
    expect(webCLIParse([], { from: 'user' }).mqtt).to.be.true
    expect(webCLIParse(['--no-mqtt'], { from: 'user' }).mqtt).to.be.false
  })

  it('should parse mqtt connection options', () => {
    const args = [
      '--mqtt-broker-url=mqtt://broker',
      '--mqtt-username=user',
      '--mqtt-password=p@ssw0rd',
      '--mqtt-topics',
      'msh/US/#',
      'msh/IN/#',
    ]
    expect(webCLIParse(args, { from: 'user' })).to.deep.contain({
      mqtt: true,
      mqttBrokerUrl: 'mqtt://broker',
      mqttPassword: 'p@ssw0rd',
      mqttTopics: ['msh/US/#', 'msh/IN/#'],
      mqttUsername: 'user',
    })
  })

  it('should parse purge args', () => {
    expect(webCLIParse(['--purge-every=PT23M', '--purge-data-older-than=PT42S'], { from: 'user' })).to.deep.contain({
      purgeEvery: Duration.fromISO('PT23M'),
      purgeDataOlderThan: Duration.fromISO('PT42S'),
      dumpStatsEvery: Duration.fromISO('PT5M'),
    })
  })

  it('should parse dump every args', () => {
    expect(webCLIParse(['--dump-stats-every=PT17M'], { from: 'user' }).dumpStatsEvery).to.deep.eq(Duration.fromISO('PT17M'))
  })

  it('should parse --filter-node-forwarding', () => {
    expect(webCLIParse(['--filter-node-forwarding', '1', '2', '3'], { from: 'user' }).filterNodeForwarding).to.deep.eq([1, 2, 3])
    expect(
      webCLIParse(['--filter-node-forwarding', '1', '--filter-node-forwarding', '2'], { from: 'user' }).filterNodeForwarding
    ).to.deep.eq([1, 2])
  })
})
