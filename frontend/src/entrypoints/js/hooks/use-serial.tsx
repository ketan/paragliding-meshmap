import { DeviceConnectionState } from './device-connection'
import { RefObject, useCallback } from 'react'
import { TransportWebSerial } from '@meshtastic/transport-web-serial'
import { MeshDevice } from '@meshtastic/core'
import { randomId } from '../utils/ui-util.tsx'
import { waitForConnection } from '../utils/device-helpers.ts'

export function useSerial({
  setStatus,
  disconnect,
  connectionRef,
  onConnect,
  logStatus,
}: {
  setStatus: (value: DeviceConnectionState) => void
  disconnect: () => void
  connectionRef: RefObject<MeshDevice | undefined>
  onConnect: (device: MeshDevice) => Promise<unknown>
  logStatus: (msg: string, ...args: unknown[]) => void
}) {
  return useCallback(async () => {
    setStatus('connecting')
    disconnect()

    const serialDevice = await navigator.serial.requestPort()

    if (serialDevice) {
      const { usbVendorId, usbProductId } = serialDevice.getInfo()
      logStatus(`Got port from user: usbVendorId=${usbVendorId} usbProductId=${usbProductId}`)
      const transport = await TransportWebSerial.createFromPort(serialDevice)
      connectionRef.current = new MeshDevice(transport, randomId())
      await waitForConnection(connectionRef.current, setStatus, logStatus)
      await onConnect(connectionRef.current)
    }
  }, [setStatus, disconnect, logStatus, connectionRef, onConnect])
}
