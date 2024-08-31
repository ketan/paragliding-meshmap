import { meshtastic } from '../gen/meshtastic-protobufs.js'
import fs from 'fs'
import { errLog } from '#helpers/logger'

function getDeviceProfile() {
  if (fs.existsSync('config/default.cfg')) {
    try {
      return meshtastic.DeviceProfile.decode(fs.readFileSync('config/default.cfg'))
    } catch (e) {
      errLog(e)
    }
  }

  return new meshtastic.DeviceProfile({
    config: new meshtastic.LocalConfig({
      position: new meshtastic.Config.PositionConfig({
        positionBroadcastSecs: 180,
        gpsUpdateInterval: 60,
        positionFlags: 811,
        broadcastSmartMinimumDistance: 100,
        broadcastSmartMinimumIntervalSecs: 30,
        gpsMode: 1,
      }),
      power: new meshtastic.Config.PowerConfig(),
      bluetooth: new meshtastic.Config.BluetoothConfig({
        enabled: true,
        mode: meshtastic.Config.BluetoothConfig.PairingMode.FIXED_PIN,
        fixedPin: 123456,
      }),
      display: new meshtastic.Config.DisplayConfig(),
      lora: new meshtastic.Config.LoRaConfig({
        usePreset: true,
        region: meshtastic.Config.LoRaConfig.RegionCode.IN,
        txEnabled: true,
        hopLimit: 3,
        txPower: 0, // default maxiumu
        sx126xRxBoostedGain: true,
        ignoreMqtt: true,
      }),
      network: new meshtastic.Config.NetworkConfig({
        wifiEnabled: false,
      }),
      security: new meshtastic.Config.SecurityConfig({
        // adminChannelEnabled: false,
        // serialEnabled: true,
      }),
      device: new meshtastic.Config.DeviceConfig({
        serialEnabled: true,
        role: meshtastic.Config.DeviceConfig.Role.CLIENT,
        tzdef: 'IST-5:30',
        nodeInfoBroadcastSecs: 3600,
      }),
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
        proxyToClientEnabled: true,
        mapReportingEnabled: true,
        mapReportSettings: new meshtastic.ModuleConfig.MapReportSettings({
          publishIntervalSecs: 7200,
          positionPrecision: 32,
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
}

export function createDeviceProfile(shortName: string, longName: string, skylinesId: string, adminPass: string) {
  const deviceProfile = getDeviceProfile()
  deviceProfile.shortName = shortName
  deviceProfile.longName = `${longName}/${skylinesId}`

  const chset = new meshtastic.ChannelSet({
    settings: [
      new meshtastic.ChannelSettings({
        moduleSettings: {
          positionPrecision: 32,
        },
        uplinkEnabled: true,
        psk: Buffer.from('AQ==', 'base64url'), // default channel key
      }),
      new meshtastic.ChannelSettings({
        downlinkEnabled: true,
        uplinkEnabled: true,
        name: 'admin',
        psk: Buffer.from(adminPass),
      }),
    ],
    loraConfig: deviceProfile.config?.lora,
  })

  const url = new Buffer(meshtastic.ChannelSet.encode(chset).finish())
    .toString('base64url')
    .replace('=', '')
    .replace('+', '-')
    .replace('/', '_')
  deviceProfile.channelUrl = `https://meshtastic.org/e/#${url}`

  errLog(JSON.stringify(deviceProfile, null, 2))
  return deviceProfile
}
