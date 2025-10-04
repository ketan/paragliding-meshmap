import { MeshDevice } from '@meshtastic/core'
import { DeviceConnectionState, ProcessState } from '../hooks/device-connection'
import { create } from '@bufbuild/protobuf'
import * as Protobuf from '@meshtastic/protobufs'
import _ from 'lodash'
import { toByteArray } from 'base64-js'
import { FormInputs } from '../components/config-form-page.tsx'
import { sleep } from './ui-util.tsx'
import {
  bluetoothConfig,
  createDeviceConfig,
  createEmptyDeviceConfig,
  createSecurityConfig,
  loraConfig,
  positionConfig,
} from './device-config.ts'
import { createEmptyModuleConfig, createMqttConfig } from './module-config.ts'

export type LogEvent = {
  time: Date
  message: string
}

function opCreateOwner(shortName: string, longName: string): Protobuf.Mesh.User {
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

// Individual connection operations as async functions
async function opSetChannel(connection: MeshDevice, logStatus: (msg: string, ...args: unknown[]) => void) {
  logStatus('Configuring channel...')
  await connection.setChannel(createChannel())
  logStatus('Channel configured.')
  await sleep(1000)
}

async function opSetConfig(connection: MeshDevice, cfg: Protobuf.Config.Config, logStatus: (msg: string, ...args: unknown[]) => void) {
  logStatus(`Setting config ${cfg.payloadVariant?.case}...`, cfg)
  await connection.setConfig(cfg)
  logStatus(`Saved config ${cfg.payloadVariant?.case}`)
  await sleep(500)
}

async function opSetModuleConfig(
  connection: MeshDevice,
  modCfg: Protobuf.ModuleConfig.ModuleConfig,
  logStatus: (msg: string, ...args: unknown[]) => void
) {
  logStatus(`Setting module config ${modCfg.payloadVariant.case}...`, modCfg)
  await connection.setModuleConfig(modCfg)
  logStatus(`Saved module config ${modCfg.payloadVariant.case}`)
  await sleep(500)
}

async function opSetOwner(connection: MeshDevice, formData: FormInputs, logStatus: (msg: string, ...args: unknown[]) => void) {
  logStatus('Setting owner...')
  await connection.setOwner(opCreateOwner(formData.shortName, formData.longName))
  logStatus('Done setting owner...')
}

async function opCommit(connection: MeshDevice, logStatus: (msg: string, ...args: unknown[]) => void) {
  logStatus('Almost done... Rebooting device...')
  await connection.reboot(5)
  logStatus('Committing settings...')
  connection.commitEditSettings()
  await sleep(5000)
  logStatus('Done configuring')
}

export async function configureDevice(
  connection: MeshDevice,
  formData: FormInputs,
  setState: (state: ProcessState) => void,
  logStatus: (msg: string, ...args: unknown[]) => void,
  setProgress: (progress: [number, number]) => void
) {
  setState('in-progress')

  // Prepare all configs and module configs
  const configs = [
    loraConfig(),
    bluetoothConfig(),
    positionConfig(),
    createSecurityConfig(),
    createDeviceConfig(),
    createEmptyDeviceConfig('power'),
    createEmptyDeviceConfig('network'),
    createEmptyDeviceConfig('display'),
    createEmptyDeviceConfig('deviceUi'),
  ]

  const moduleConfigs = [
    createMqttConfig(),
    createEmptyModuleConfig('neighborInfo'),
    createEmptyModuleConfig('externalNotification'),
    createEmptyModuleConfig('storeForward'),
    createEmptyModuleConfig('rangeTest'),
    createEmptyModuleConfig('telemetry'),
    createEmptyModuleConfig('cannedMessage'),
    createEmptyModuleConfig('audio'),
    createEmptyModuleConfig('remoteHardware'),
    createEmptyModuleConfig('ambientLighting'),
    createEmptyModuleConfig('detectionSensor'),
    createEmptyModuleConfig('paxcounter'),
    createEmptyModuleConfig('serial'),
  ]

  // Build the steps array
  const steps = [
    async () => await opSetChannel(connection, logStatus),
    ...configs.map((cfg) => async () => await opSetConfig(connection, cfg, logStatus)),
    async () => await sleep(5000),
    ...moduleConfigs.map((modCfg) => async () => await opSetModuleConfig(connection, modCfg, logStatus)),
    async () => await sleep(5000),
    async () => await opSetOwner(connection, formData, logStatus),
    async () => await opCommit(connection, logStatus),
  ]

  // Iterate and track progress
  for (let i = 0; i < steps.length; i++) {
    setProgress([i + 1, steps.length])
    await steps[i]()
  }
  setState('done')
}

export async function waitForConnection(
  meshDevice: MeshDevice,
  setConnectionStatus: (value: DeviceConnectionState) => void,
  logStatus: (msg: string, ...args: unknown[]) => void
) {
  logStatus('Waiting for connection...')
  setConnectionStatus('connecting')
  meshDevice.configure()
  logStatus('Sent configure command...')
  // _subscribeAll(meshDevice)

  await new Promise<void>((resolve) => {
    const subscriptionHandler = async () => {
      logStatus('Got node info from device. Assuming connected...')
      // we received node info, so we are connected
      resolve()
    }
    logStatus('Subscribing to node info events...')
    meshDevice.events.onMyNodeInfo.one(subscriptionHandler)
  })

  setConnectionStatus('connected')
  logStatus('Waiting 10s for the connection to stabilize...')
  await sleep(10000)
}

export function getProgressMessage(
  connectionStatus: DeviceConnectionState,
  processState: ProcessState,
  transport: 'Bluetooth' | 'USB',
  operationType: 'factory reset' | 'configuration'
) {
  if (connectionStatus === 'not-connected') {
    return `Connect to your device via ${transport} to begin.`
  }
  if (connectionStatus === 'connecting') {
    return `Connecting to device via ${transport}...`
  }
  if (connectionStatus === 'connected' && processState === 'not-started') {
    return `Device connected. ${_.capitalize(operationType)} will start shortly...`
  }
  if (connectionStatus === 'connected' && processState === 'in-progress') {
    return `${_.capitalize(operationType)} in progress. Do not disconnect${transport === 'USB' ? ' or move' : ''} the device...`
  }
  if (connectionStatus === 'connected' && processState === 'done') {
    return `${_.capitalize(operationType)} complete! Device is rebooting.`
  }
  return ''
}
