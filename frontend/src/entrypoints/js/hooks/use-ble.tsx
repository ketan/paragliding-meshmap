import { DeviceConnectionState } from './device-connection'
import { RefObject, useCallback } from 'react'
import { TransportWebBluetooth } from '@meshtastic/transport-web-bluetooth'
import { MeshDevice } from '@meshtastic/core'
import { randomId } from '../utils/ui-util.tsx'
import { waitForConnection } from '../utils/device-helpers.ts'

export function useBle({
  setStatus,
  disconnect,
  connectionRef,
  onConnect,
}: {
  setStatus: (value: DeviceConnectionState) => void
  disconnect: () => void
  connectionRef: RefObject<MeshDevice | undefined>
  onConnect: (device: MeshDevice) => Promise<unknown>
}) {
  return useCallback(async () => {
    setStatus('connecting')
    disconnect()

    const bleDevice = await navigator.bluetooth.requestDevice({
      filters: [{ services: [TransportWebBluetooth.ServiceUuid] }],
    })

    if (bleDevice) {
      const transport = await TransportWebBluetooth.createFromDevice(bleDevice)
      connectionRef.current = new MeshDevice(transport, randomId())
      await waitForConnection(connectionRef.current, setStatus)
      await onConnect(connectionRef.current)
    }
  }, [setStatus, disconnect, connectionRef, onConnect])
}
