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
    channelUrl: 'https://meshtastic.org/e/#CgkSAQEoAToCCCAKDhIBPBoFYWRtaW4oATABEg8IATgKQANIAVAeaAHABgE',
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
      network: new meshtastic.Config.NetworkConfig(),
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
          publishIntervalSecs: 120,
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

export function createDeviceProfile(shortName: string, longName: string, skylinesId: string) {
  const deviceProfile = getDeviceProfile()
  deviceProfile.shortName = shortName
  deviceProfile.longName = `${longName}/${skylinesId}`
  return deviceProfile
}
