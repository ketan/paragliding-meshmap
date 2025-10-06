import { expect } from 'chai'
import { createDeviceProfile } from '#helpers/create-device-profile'
import { meshtastic } from '../../src/gen/meshtastic-protobufs.js'

describe('getDefaultProfile', () => {
  it('should assert all attributes of DeviceProfile object', () => {
    const shortName = 'TestShortName'
    const longName = 'TestLongName'
    const deviceProfile = createDeviceProfile(shortName, longName)

    expect(deviceProfile).to.be.an.instanceof(meshtastic.DeviceProfile)
    expect(deviceProfile.shortName).to.equal(shortName)
    expect(deviceProfile.longName).to.equal(longName)

    expect(deviceProfile.config).to.be.an.instanceof(meshtastic.LocalConfig)
    expect(deviceProfile.config?.position).to.be.an.instanceof(meshtastic.Config.PositionConfig)
    expect(deviceProfile.config?.position?.positionBroadcastSecs).to.equal(180)
    expect(deviceProfile.config?.position?.gpsUpdateInterval).to.equal(60)
    expect(deviceProfile.config?.position?.positionFlags).to.equal(811)
    expect(deviceProfile.config?.position?.broadcastSmartMinimumDistance).to.equal(100)
    expect(deviceProfile.config?.position?.broadcastSmartMinimumIntervalSecs).to.equal(30)
    expect(deviceProfile.config?.position?.gpsMode).to.equal(meshtastic.Config.PositionConfig.GpsMode.ENABLED)

    expect(deviceProfile.config?.power).to.be.an.instanceof(meshtastic.Config.PowerConfig)
    expect(deviceProfile.config?.network).to.be.an.instanceof(meshtastic.Config.NetworkConfig)
    expect(deviceProfile.config?.bluetooth).to.be.an.instanceof(meshtastic.Config.BluetoothConfig)
    expect(deviceProfile.config?.bluetooth?.enabled).to.be.true
    expect(deviceProfile.config?.bluetooth?.mode).to.equal(meshtastic.Config.BluetoothConfig.PairingMode.FIXED_PIN)
    expect(deviceProfile.config?.bluetooth?.fixedPin).to.equal(123456)
    expect(deviceProfile.config?.display).to.be.an.instanceof(meshtastic.Config.DisplayConfig)
    expect(deviceProfile.config?.lora).to.be.an.instanceof(meshtastic.Config.LoRaConfig)
    expect(deviceProfile.config?.lora?.usePreset).to.be.true
    expect(deviceProfile.config?.lora?.region).to.equal(meshtastic.Config.LoRaConfig.RegionCode.IN)
    expect(deviceProfile.config?.lora?.txEnabled).to.be.true
    expect(deviceProfile.config?.lora?.hopLimit).to.equal(3)
    expect(deviceProfile.config?.lora?.txPower).to.equal(0)
    expect(deviceProfile.config?.lora?.sx126xRxBoostedGain).to.be.true
    expect(deviceProfile.config?.lora?.ignoreMqtt).to.be.true

    expect(deviceProfile.config?.device).to.be.an.instanceof(meshtastic.Config.DeviceConfig)
    expect(deviceProfile.config?.device?.tzdef).to.equal('IST-5:30')

    expect(deviceProfile.moduleConfig).to.be.an.instanceof(meshtastic.LocalModuleConfig)
    expect(deviceProfile.moduleConfig?.neighborInfo).to.be.an.instanceof(meshtastic.ModuleConfig.NeighborInfoConfig)
    expect(deviceProfile.moduleConfig?.neighborInfo?.updateInterval).to.equal(900)
    expect(deviceProfile.moduleConfig?.mqtt).to.be.an.instanceof(meshtastic.ModuleConfig.MQTTConfig)
    expect(deviceProfile.moduleConfig?.mqtt?.address).to.equal('mqtt.bircom.in')
    expect(deviceProfile.moduleConfig?.mqtt?.username).to.equal('uplink')
    expect(deviceProfile.moduleConfig?.mqtt?.password).to.equal('uplink')
    expect(deviceProfile.moduleConfig?.mqtt?.root).to.equal('msh/IN/Bir/mqtt')
    expect(deviceProfile.moduleConfig?.mqtt?.enabled).to.be.true
    expect(deviceProfile.moduleConfig?.mqtt?.proxyToClientEnabled).to.be.true
    expect(deviceProfile.moduleConfig?.mqtt?.mapReportingEnabled).to.be.true
    expect(deviceProfile.moduleConfig?.mqtt?.mapReportSettings).to.be.an.instanceof(meshtastic.ModuleConfig.MapReportSettings)
    expect(deviceProfile.moduleConfig?.mqtt?.mapReportSettings?.publishIntervalSecs).to.equal(7200)
    expect(deviceProfile.moduleConfig?.mqtt?.mapReportSettings?.positionPrecision).to.equal(32)

    expect(deviceProfile.moduleConfig?.serial).to.be.an.instanceof(meshtastic.ModuleConfig.SerialConfig)
    expect(deviceProfile.moduleConfig?.externalNotification).to.be.an.instanceof(meshtastic.ModuleConfig.ExternalNotificationConfig)
    expect(deviceProfile.moduleConfig?.storeForward).to.be.an.instanceof(meshtastic.ModuleConfig.StoreForwardConfig)
    expect(deviceProfile.moduleConfig?.rangeTest).to.be.an.instanceof(meshtastic.ModuleConfig.RangeTestConfig)
    expect(deviceProfile.moduleConfig?.telemetry).to.be.an.instanceof(meshtastic.ModuleConfig.TelemetryConfig)
    expect(deviceProfile.moduleConfig?.cannedMessage).to.be.an.instanceof(meshtastic.ModuleConfig.CannedMessageConfig)
    expect(deviceProfile.moduleConfig?.audio).to.be.an.instanceof(meshtastic.ModuleConfig.AudioConfig)
    expect(deviceProfile.moduleConfig?.remoteHardware).to.be.an.instanceof(meshtastic.ModuleConfig.RemoteHardwareConfig)
    expect(deviceProfile.moduleConfig?.ambientLighting).to.be.an.instanceof(meshtastic.ModuleConfig.AmbientLightingConfig)
    expect(deviceProfile.moduleConfig?.detectionSensor).to.be.an.instanceof(meshtastic.ModuleConfig.DetectionSensorConfig)
    expect(deviceProfile.moduleConfig?.paxcounter).to.be.an.instanceof(meshtastic.ModuleConfig.PaxcounterConfig)

    expect(deviceProfile.channelUrl).to.eq('https://meshtastic.org/e/#CgkSAQEoAToCCCASFAgBOApAA0gBUABYAGgBwAYByAYB')
  })
})
describe('createDeviceProfile', () => {
  it('should return a valid DeviceProfile object', () => {
    const shortName = 'TestShortName'
    const longName = 'TestLongName'
    const deviceProfile = createDeviceProfile(shortName, longName)

    expect(deviceProfile).to.be.an.instanceof(meshtastic.DeviceProfile)
    expect(deviceProfile.shortName).to.equal(shortName)
    expect(deviceProfile.longName).to.equal(longName)
  })

  it('should ensure correct data types and values', () => {
    const shortName = 'TestShortName'
    const longName = 'TestLongName'
    const deviceProfile = createDeviceProfile(shortName, longName)

    expect(deviceProfile.config).to.be.an.instanceof(meshtastic.LocalConfig)
    expect(deviceProfile.config?.position).to.be.an.instanceof(meshtastic.Config.PositionConfig)
    expect(deviceProfile.config?.position?.positionBroadcastSecs).to.equal(180)
    expect(deviceProfile.config?.position?.gpsUpdateInterval).to.equal(60)
    expect(deviceProfile.config?.position?.positionFlags).to.equal(811)
    expect(deviceProfile.config?.position?.broadcastSmartMinimumDistance).to.equal(100)
    expect(deviceProfile.config?.position?.broadcastSmartMinimumIntervalSecs).to.equal(30)
    expect(deviceProfile.config?.position?.gpsMode).to.equal(meshtastic.Config.PositionConfig.GpsMode.ENABLED)

    expect(deviceProfile.moduleConfig).to.be.an.instanceof(meshtastic.LocalModuleConfig)
    expect(deviceProfile.moduleConfig?.neighborInfo).to.be.an.instanceof(meshtastic.ModuleConfig.NeighborInfoConfig)
    expect(deviceProfile.moduleConfig?.neighborInfo?.updateInterval).to.equal(900)

    expect(deviceProfile.channelUrl).to.be.eq('https://meshtastic.org/e/#CgkSAQEoAToCCCASFAgBOApAA0gBUABYAGgBwAYByAYB')
  })

  it('should handle edge cases', () => {
    const shortName = ''
    const longName = ''
    const deviceProfile = createDeviceProfile(shortName, longName)

    expect(deviceProfile.shortName).to.equal(shortName)
    expect(deviceProfile.longName).to.equal(longName)
  })
})
