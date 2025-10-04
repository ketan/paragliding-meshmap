import { create } from '@bufbuild/protobuf'
import * as Protobuf from '@meshtastic/protobufs'

type PayloadVariantCase =
  | 'mqtt'
  | 'serial'
  | 'externalNotification'
  | 'storeForward'
  | 'rangeTest'
  | 'telemetry'
  | 'cannedMessage'
  | 'audio'
  | 'remoteHardware'
  | 'neighborInfo'
  | 'ambientLighting'
  | 'detectionSensor'
  | 'paxcounter'

export function createEmptyModuleConfig(configVariant: PayloadVariantCase) {
  return create(Protobuf.ModuleConfig.ModuleConfigSchema, {
    payloadVariant: {
      case: configVariant,
      value: {},
    },
  })
}

export function createMqttConfig() {
  return create(Protobuf.ModuleConfig.ModuleConfigSchema, {
    payloadVariant: {
      case: 'mqtt',
      value: {
        address: 'mqtt.bircom.in',
        username: 'uplink',
        password: 'uplink',
        root: 'msh/IN/Bir/mqtt',
        enabled: true,
        proxyToClientEnabled: true,
        mapReportingEnabled: true,
        mapReportSettings: {
          publishIntervalSecs: 7200,
          positionPrecision: 32,
          shouldReportLocation: true,
        },
      },
    },
  })
}
