import { create } from '@bufbuild/protobuf'
import * as Protobuf from '@meshtastic/protobufs'

type ConfigVariant = 'lora' | 'device' | 'position' | 'power' | 'network' | 'display' | 'bluetooth' | 'security' | 'sessionkey' | 'deviceUi'

export function loraConfig() {
  return create(Protobuf.Config.ConfigSchema, {
    payloadVariant: {
      case: 'lora',
      value: {
        usePreset: true,
        region: Protobuf.Config.Config_LoRaConfig_RegionCode.IN,
        txEnabled: true,
        hopLimit: 3,
        txPower: 0, // default maxiumum
        sx126xRxBoostedGain: true,
        ignoreMqtt: true,
        configOkToMqtt: true,
        channelNum: 0,
      },
    },
  })
}

export function bluetoothConfig() {
  return create(Protobuf.Config.ConfigSchema, {
    payloadVariant: {
      case: 'bluetooth',
      value: {
        enabled: true,
        mode: Protobuf.Config.Config_BluetoothConfig_PairingMode.FIXED_PIN,
        fixedPin: 123456,
      },
    },
  })
}

export function positionConfig() {
  return create(Protobuf.Config.ConfigSchema, {
    payloadVariant: {
      case: 'position',
      value: {
        positionBroadcastSecs: 180,
        gpsUpdateInterval: 60,
        positionFlags: 811,
        broadcastSmartMinimumDistance: 100,
        broadcastSmartMinimumIntervalSecs: 30,
        gpsMode: Protobuf.Config.Config_PositionConfig_GpsMode.ENABLED,
      },
    },
  })
}

export function createSecurityConfig() {
  return create(Protobuf.Config.ConfigSchema, {
    payloadVariant: {
      case: 'security',
      value: {
        serialEnabled: true,
      },
    },
  })
}

export function createDeviceConfig() {
  return create(Protobuf.Config.ConfigSchema, {
    payloadVariant: {
      case: 'device',
      value: {
        tzdef: 'IST-5:30',
      },
    },
  })
}

export function createEmptyDeviceConfig(configVariant: ConfigVariant) {
  return create(Protobuf.Config.ConfigSchema, {
    payloadVariant: {
      case: configVariant,
      value: {},
    },
  })
}
