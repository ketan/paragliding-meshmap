import { MeshDevice, Types } from '@meshtastic/core'
import { sleep } from './ui-util.tsx'
import { deviceLogger } from '../hooks/device-setup-hooks.ts'
import { DeviceConnectionState } from '../hooks/device-connection'

async function _waitForDeviceConnected(connection: MeshDevice): Promise<void> {
  return new Promise((resolve) => {
    const unsubscribeHandler = connection.events.onDeviceStatus.subscribe((status) => {
      deviceLogger.info(`Connected to device ${status}`)
      if (status === Types.DeviceStatusEnum.DeviceConnected) {
        unsubscribeHandler()
        resolve()
      }
    })
  })
}

export async function initializeDevice(connection: MeshDevice, _waitForConnection: boolean) {
  deviceLogger.info(`Initializing the device...`)
  connection.configure()
  deviceLogger.info(`Waiting for config messages...`)
  // if (waitForConnection) {
  //   deviceLogger.info(`Waiting for device to be connected...`)
  await _waitForDeviceConnected(connection)
  // }

  // Set a heartbeat interval to keep the connection alive
  const HEARTBEAT_INTERVAL = 5 * 60 * 1000
  connection.setHeartbeatInterval(HEARTBEAT_INTERVAL)

  await sleep(1000)
  // subscribeAll(connection)
  deviceLogger.info(`Configuration done, setting up the device...`)
  await sleep(1000)
}

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
