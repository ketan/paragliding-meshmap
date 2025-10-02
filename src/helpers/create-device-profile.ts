import { meshtastic } from '../gen/meshtastic-protobufs.js'
import fs from 'fs'
import { errLog } from '#helpers/logger'
import { PathLike } from 'node:fs'

export function channelSetFromUrl(url: string): meshtastic.ChannelSet {
  // Extract the base64url string after the last '#'
  const base64url = url.split('#').pop() || ''
  // Convert base64url to base64
  const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/')
  // Pad with '=' if needed
  const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4)
  // Decode base64 to buffer
  const buf = Buffer.from(padded, 'base64')
  // Decode protobuf
  return meshtastic.ChannelSet.decode(buf)
}

function channelUrl(loRaConfig: meshtastic.Config.ILoRaConfig) {
  const chset = new meshtastic.ChannelSet({
    settings: [
      new meshtastic.ChannelSettings({
        moduleSettings: {
          positionPrecision: 32,
        },
        uplinkEnabled: true,
        psk: Buffer.from('AQ==', 'base64url'), // default channel key
      }),
    ],
    loraConfig: loRaConfig,
  })

  const url = Buffer.from(meshtastic.ChannelSet.encode(chset).finish())
    .toString('base64url')
    .replace('=', '')
    .replace('+', '-')
    .replace('/', '_')
  return `https://meshtastic.org/e/#${url}`
}

export function getDefaultProfile() {
  const loRaConfig = new meshtastic.Config.LoRaConfig({
    usePreset: true,
    region: meshtastic.Config.LoRaConfig.RegionCode.IN,
    txEnabled: true,
    hopLimit: 3,
    txPower: 0, // default maxiumum
    sx126xRxBoostedGain: true,
    ignoreMqtt: true,
    configOkToMqtt: true,
    channelNum: 0,
  })
  const deviceProfile = new meshtastic.DeviceProfile({
    config: new meshtastic.LocalConfig({
      position: new meshtastic.Config.PositionConfig({
        positionBroadcastSecs: 180,
        gpsUpdateInterval: 60,
        positionFlags: 811,
        broadcastSmartMinimumDistance: 100,
        broadcastSmartMinimumIntervalSecs: 30,
        gpsMode: meshtastic.Config.PositionConfig.GpsMode.ENABLED,
      }),
      power: new meshtastic.Config.PowerConfig(),
      network: new meshtastic.Config.NetworkConfig(),
      bluetooth: new meshtastic.Config.BluetoothConfig({
        enabled: true,
        mode: meshtastic.Config.BluetoothConfig.PairingMode.FIXED_PIN,
        fixedPin: 123456,
      }),
      display: new meshtastic.Config.DisplayConfig(),
      lora: loRaConfig,
    }),
    moduleConfig: new meshtastic.LocalModuleConfig({
      neighborInfo: new meshtastic.ModuleConfig.NeighborInfoConfig({
        updateInterval: 900,
      }),

      mqtt: new meshtastic.ModuleConfig.MQTTConfig({
        address: 'mqtt.bircom.in',
        username: 'uplink',
        password: 'uplink',
        root: 'msh/IN/Bir/mqtt',
        enabled: true,
        proxyToClientEnabled: true,
        mapReportingEnabled: true,
        mapReportSettings: new meshtastic.ModuleConfig.MapReportSettings({
          publishIntervalSecs: 7200,
          positionPrecision: 32,
          shouldReportLocation: true,
        }),
      }),

      serial: new meshtastic.ModuleConfig.SerialConfig(),
      externalNotification: new meshtastic.ModuleConfig.ExternalNotificationConfig(),
      storeForward: new meshtastic.ModuleConfig.StoreForwardConfig(),
      rangeTest: new meshtastic.ModuleConfig.RangeTestConfig(),
      telemetry: new meshtastic.ModuleConfig.TelemetryConfig(),
      cannedMessage: new meshtastic.ModuleConfig.CannedMessageConfig(),
      audio: new meshtastic.ModuleConfig.AudioConfig(),
      remoteHardware: new meshtastic.ModuleConfig.RemoteHardwareConfig(),
      ambientLighting: new meshtastic.ModuleConfig.AmbientLightingConfig(),
      detectionSensor: new meshtastic.ModuleConfig.DetectionSensorConfig(),
      paxcounter: new meshtastic.ModuleConfig.PaxcounterConfig(),
    }),
  })

  return deviceProfile
}

export function getDeviceProfile(path?: PathLike) {
  if (path && fs.existsSync(path)) {
    try {
      return meshtastic.DeviceProfile.decode(fs.readFileSync(path))
    } catch (e) {
      errLog(e)
    }
  }
  return getDefaultProfile()
}

export function createDeviceProfile(shortName: string, longName: string) {
  const deviceProfile = getDeviceProfile('config/default.cfg')
  deviceProfile.shortName = shortName
  deviceProfile.longName = longName
  if (deviceProfile.config?.lora) {
    deviceProfile.channelUrl = channelUrl(deviceProfile.config.lora)
  } else {
    throw 'Could not find a lora config for device profile ' + deviceProfile
  }
  return deviceProfile
}
