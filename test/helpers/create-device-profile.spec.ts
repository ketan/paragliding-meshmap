import { expect } from 'chai'
import { createDeviceProfile } from '#helpers/create-device-profile'
import { meshtastic } from '../../src/gen/meshtastic-protobufs.js'

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

    expect(deviceProfile.channelUrl).to.be.eq('https://meshtastic.org/e/#CgkSAQEoAToCCCASDwgBOApAA0gBUABoAcAGAQ')
  })

  it('should handle edge cases', () => {
    const shortName = ''
    const longName = ''
    const deviceProfile = createDeviceProfile(shortName, longName)

    expect(deviceProfile.shortName).to.equal(shortName)
    expect(deviceProfile.longName).to.equal(longName)
  })
})
