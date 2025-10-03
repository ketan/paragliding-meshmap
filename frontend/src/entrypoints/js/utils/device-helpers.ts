import { MeshDevice } from '@meshtastic/core'
import { sleep } from './ui-util.tsx'
import { deviceLogger } from '../hooks/device-setup-hooks.ts'
import { DeviceConnectionState, ProcessState } from '../hooks/device-connection'

export async function waitForConnection(meshDevice: MeshDevice, setConnectionStatus: (value: DeviceConnectionState) => void) {
  deviceLogger.info('Waiting for connection...')
  setConnectionStatus('connecting')
  meshDevice.configure()
  deviceLogger.info('Sent configure command...')
  // _subscribeAll(meshDevice)

  await new Promise<void>((resolve) => {
    const subscriptionHandler = async () => {
      deviceLogger.info('Got node info from device. Assuming connected...')
      // we received node info, so we are connected
      resolve()
    }
    deviceLogger.info('Subscribing to node info events...')
    meshDevice.events.onMyNodeInfo.one(subscriptionHandler)
  })

  setConnectionStatus('connected')
  deviceLogger.info('Done waiting for connection')
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
    return `Device connected. ${capitalize(operationType)} will start shortly...`
  }
  if (connectionStatus === 'connected' && processState === 'in-progress') {
    return `${capitalize(operationType)} in progress. Do not disconnect${transport === 'USB' ? ' or move' : ''} the device...`
  }
  if (connectionStatus === 'connected' && processState === 'done') {
    return `${capitalize(operationType)} complete! Device is rebooting.`
  }
  return ''
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
