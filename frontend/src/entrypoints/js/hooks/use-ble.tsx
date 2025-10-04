import { DeviceConnectionState } from './device-connection'
import { RefObject, useCallback } from 'react'
import { TransportWebBluetooth } from '@meshtastic/transport-web-bluetooth'
import { MeshDevice } from '@meshtastic/core'
import { randomId } from '../utils/ui-util.tsx'
import { waitForConnection } from '../utils/device-helpers.ts'
import * as Protobuf from '@meshtastic/protobufs'

export function useBle({
  setStatus,
  disconnect,
  connectionRef,
  onConnect,
  logStatus,
  setDeviceMetadata,
}: {
  setStatus: (value: DeviceConnectionState) => void
  disconnect: () => void
  setDeviceMetadata: (meta: Protobuf.Mesh.DeviceMetadata) => void
  connectionRef: RefObject<MeshDevice | undefined>
  onConnect: (device: MeshDevice) => Promise<unknown>
  logStatus: (msg: string, ...args: unknown[]) => void
}) {
  return useCallback(async () => {
    setStatus('connecting')
    disconnect()

    const bleDevice = await navigator.bluetooth.requestDevice({
      filters: [{ services: [TransportWebBluetooth.ServiceUuid] }],
    })

    if (bleDevice) {
      logStatus(`Got device ${bleDevice.id}/${bleDevice.name}`)
      const transport = await TransportWebBluetooth.createFromDevice(bleDevice)
      connectionRef.current = new MeshDevice(transport, randomId())
      await waitForConnection(connectionRef.current, setStatus, setDeviceMetadata, logStatus)
      await onConnect(connectionRef.current)
    }
  }, [setStatus, disconnect, logStatus, connectionRef, setDeviceMetadata, onConnect])
}
