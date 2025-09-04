import { MeshDevice, Types } from '@meshtastic/core'
import { sleep } from './ui-util.tsx'
import { deviceLogger } from '../hooks/device-setup-hooks.ts'

async function waitForDeviceConnected(connection: MeshDevice): Promise<void> {
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

export async function initializeDevice(connection: MeshDevice, waitForConnection: boolean) {
  // Set a heartbeat interval to keep the connection alive
  const HEARTBEAT_INTERVAL = 5 * 60 * 1000
  connection.setHeartbeatInterval(HEARTBEAT_INTERVAL)
  deviceLogger.info(`Initializing the device...`)
  connection.configure()
  deviceLogger.info(`Waiting for config messages...`)
  if (waitForConnection) {
    deviceLogger.info(`Waiting for device to be connected...`)
    await waitForDeviceConnected(connection)
  }

  await sleep(1000)
  // subscribeAll(connection)
  deviceLogger.info(`Configuration done, setting up the device...`)
  await sleep(1000)
}
