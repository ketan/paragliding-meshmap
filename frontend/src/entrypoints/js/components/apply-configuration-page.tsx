import { ReactNode, useState } from 'react'
import { create } from '@bufbuild/protobuf'
import * as Protobuf from '@meshtastic/protobufs'
import { toByteArray } from 'base64-js'
import { MeshDevice } from '@meshtastic/core'
import { sleep } from '../utils/ui-util'
import { IconCheckbox } from '@tabler/icons-react'
import { deviceLogger } from '../hooks/device-setup-hooks'
import { useSerialDevice } from '../hooks/SerialDeviceContext.tsx'
import { meshtastic } from '../../../../../src/gen/meshtastic-protobufs'
import { useBleDevice } from '../hooks/BleDeviceContext.tsx'
import { ConnectionOperationButton } from './connection-operation-button.tsx'
import { BluetoothStatusIcon } from './bluetooth-status-icon.tsx'
import { UsbStatusIcon } from './usb-status-icon.tsx'
import { FormInputs } from './config-form-page.tsx'
import { ProcessState } from '../hooks/device-connection'

function loraConfig() {
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

function positionConfig() {
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

function bluetoothConfig() {
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

function createMqttConfig() {
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

function createOwner(shortName: string, longName: string): Protobuf.Mesh.User {
  return create(Protobuf.Mesh.UserSchema, {
    shortName: shortName,
    longName: longName,
  })
}

function createChannel(): Protobuf.Channel.Channel {
  return create(Protobuf.Channel.ChannelSchema, {
    role: Protobuf.Channel.Channel_Role.PRIMARY,
    settings: {
      channelNum: 0,
      psk: toByteArray('AQ=='),
      uplinkEnabled: true,
      moduleSettings: {
        positionPrecision: 32,
      },
    },
  })
}

interface ApplyConfigurationPageParams {
  formData: FormInputs
  resetType: 'bluetooth' | 'usb'
}

function cannedMessages() {
  return create(Protobuf.ModuleConfig.ModuleConfigSchema, {
    payloadVariant: {
      case: 'cannedMessage',
      value: new meshtastic.ModuleConfig.CannedMessageConfig() as unknown as Protobuf.ModuleConfig.ModuleConfig_CannedMessageConfig,
    },
  })
}

const onConnect = async (connection: MeshDevice, formData: FormInputs, setState: (state: ProcessState) => void) => {
  setState('in-progress')
  await sleep(1000)

  // Save all channel configs first, doesn't require a commit/reboot
  deviceLogger.info(`Configuring channel...`)
  await connection.setChannel(createChannel())
  deviceLogger.info(`Channel configured.`)
  await sleep(1000)

  const configs = [
    loraConfig(),
    bluetoothConfig(),
    positionConfig(),
    // createEmptyDeviceConfig('security'),
    // createEmptyDeviceConfig('power'), // has some problems, hanging, skipping for now
    // createEmptyDeviceConfig('network'), // has some problems, hanging, skipping for now
    // createEmptyDeviceConfig('display'),
    // createEmptyDeviceConfig('device'),
    // createEmptyDeviceConfig('deviceUi'),
  ]

  // Chain the promises in configs
  for (const cfg of configs) {
    deviceLogger.info(`Setting config ${cfg.payloadVariant.case}...`)
    await connection.setConfig(cfg)
    deviceLogger.info(`Saved config ${cfg.payloadVariant.case}`)
    await sleep(2000)
  }
  // await Promise.all(
  //   configs.map(async (cfg) => {
  //     bleLogger.info(`Setting config ${cfg.payloadVariant.case}...`)
  //     await connection.setConfig(cfg)
  //     bleLogger.info(`Saved config ${cfg.payloadVariant.case}`)
  //   })
  // )

  await sleep(5000)

  const moduleConfigs = [
    // createEmptyModuleConfig('neighborInfo'),
    // createEmptyModuleConfig('externalNotification'),
    // createEmptyModuleConfig('storeForward'),
    // createEmptyModuleConfig('rangeTest'),
    // createEmptyModuleConfig('telemetry'),
    cannedMessages(),
    // createEmptyModuleConfig('audio'),
    // createEmptyModuleConfig('remoteHardware'),
    // createEmptyModuleConfig('ambientLighting'),
    // createEmptyModuleConfig('detectionSensor'),
    // createEmptyModuleConfig('paxcounter'),
    createMqttConfig(),
    // createEmptyModuleConfig('serial'),
  ]

  // await Promise.all(
  //   moduleConfigs.map(async (cfg) => {
  //     bleLogger.info(`Setting module ${cfg.payloadVariant.case}...`)
  //     await connection.setModuleConfig(cfg)
  //     bleLogger.info(`Saved module ${cfg.payloadVariant.case}`)
  //   })
  // )

  await sleep(5000)

  for (const modCfg of moduleConfigs) {
    deviceLogger.info(`Setting module config ${modCfg.payloadVariant.case}...`)
    await connection.setModuleConfig(modCfg)
    deviceLogger.info(`Saved module config ${modCfg.payloadVariant.case}`)
    await sleep(2000)
  }

  await sleep(1000)
  deviceLogger.info(`Setting owner...`)
  await connection.setOwner(createOwner(formData.shortName, formData.longName))

  deviceLogger.info(`Committing...`)
  connection.commitEditSettings()
  await sleep(1000)
  deviceLogger.info(`Done configuring`)
  setState('done')
}

export function ApplyConfigurationPage({ formData, resetType }: ApplyConfigurationPageParams) {
  const [bleConfigurationProcessState, setBleConfigurationProcessState] = useState<ProcessState>('not-started')
  const [usbConfigurationProcessState, setUsbConfigurationProcessState] = useState<ProcessState>('not-started')

  const [errorMessage, _setErrorMessage] = useState<ReactNode>()

  const { bleConnectionStatus, scanBLEDevices } = useBleDevice({
    onConnect: (device) => onConnect(device, formData, setBleConfigurationProcessState),
  })

  const { serialConnectionStatus, scanSerialDevices } = useSerialDevice({
    onConnect: (device) => onConnect(device, formData, setUsbConfigurationProcessState),
  })

  return (
    <div className="text-sm md:text-md">
      <div className="block w-full sm:text-sm">
        <div className="rounded-md shadow-sm p-4">
          <div className="pl-2">
            <p className="font-semibold text-base text-center pb-4">Apply configuration</p>

            <div className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-yellow-200 mb-8">
              <p className="font-semibold text-base">Before you proceed!</p>
              <ul className="list-disc list-inside space-y-1 md:text-sm text-xs">
                <li>Restart your meshtastic device.</li>
                <li>Wait 30 seconds for it to start up.</li>
                {resetType === 'usb' && <li>Disconnect and reconnect the USB cable.</li>}
                <li>Then, attempt to configure the device.</li>
                <li>
                  If this computer or phone cannot pair with your meshtastic device, try &#34;forgetting&#34; the bluetooth device from your
                  phone or computer settings.
                </li>
              </ul>
            </div>

            {errorMessage && <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{errorMessage}</div>}

            <div className="flex gap-4 text-white">
              {resetType === 'bluetooth' && (
                <ConnectionOperationButton
                  connectionStatus={bleConnectionStatus}
                  onButtonClicked={scanBLEDevices}
                  processState={bleConfigurationProcessState}
                  label={({ processCompleted }) => {
                    if (processCompleted) {
                      return 'Configure completed - wait for device to reboot!'
                    } else {
                      return 'Configure using Bluetooth (warning: may not work)'
                    }
                  }}
                  icon={({ inProgress, processCompleted }) =>
                    processCompleted ? <IconCheckbox /> : <BluetoothStatusIcon inProgress={inProgress} />
                  }
                  setFactoryResetState={setBleConfigurationProcessState}
                />
              )}

              {resetType === 'usb' && (
                <ConnectionOperationButton
                  connectionStatus={serialConnectionStatus}
                  onButtonClicked={scanSerialDevices}
                  processState={usbConfigurationProcessState}
                  label={({ processCompleted }) => {
                    if (processCompleted) {
                      return 'Configure completed - wait for device to reboot!'
                    } else {
                      return 'Configure using USB (recommended)'
                    }
                  }}
                  icon={({ inProgress, processCompleted }) =>
                    processCompleted ? <IconCheckbox /> : <UsbStatusIcon inProgress={inProgress} />
                  }
                  setFactoryResetState={setUsbConfigurationProcessState}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
