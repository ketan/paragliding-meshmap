import { createContext, useContext, useCallback, useEffect, useState, useRef, ReactNode } from 'react'
import { TransportWebBluetooth } from '@meshtastic/transport-web-bluetooth'
import { MeshDevice } from '@meshtastic/core'
import { deviceLogger } from './device-setup-hooks'
import { DeviceConnectionState } from './device-connection'
import { initializeDevice } from '../utils/initialize-device.ts'

const meshtasticServiceID = TransportWebBluetooth.ServiceUuid

interface BleDeviceContextType {
  bleDevice?: BluetoothDevice
  bleConnectionStatus: DeviceConnectionState
  bleMeshDevice?: MeshDevice
  scanBLEDevices: () => Promise<void>
  disconnect: () => void
  setOnConnect: (cb?: (device: MeshDevice) => void) => void
}

const BleDeviceContext = createContext<BleDeviceContextType | undefined>(undefined)

export const BleDeviceProvider = ({ children }: { children: ReactNode }) => {
  const [bleDevice, setBleDevice] = useState<BluetoothDevice>()
  const [bleConnectionStatus, setBleConnectionStatus] = useState<DeviceConnectionState>('not-connected')
  const [bleMeshDevice, setBleMeshDevice] = useState<MeshDevice>()
  const onConnectRef = useRef<(device: MeshDevice) => void>(null)

  const setOnConnect = useCallback((cb?: (device: MeshDevice) => void) => {
    onConnectRef.current = cb!
  }, [])

  const scanBLEDevices = useCallback(async () => {
    setBleConnectionStatus('connecting')
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: [meshtasticServiceID] }],
      })
      if (device) {
        setBleDevice(device)
      } else {
        setBleConnectionStatus('not-connected')
      }
    } catch (e) {
      deviceLogger.error('Error during BLE device scan or connection:', e)
      setBleConnectionStatus('not-connected')
    }
  }, [])

  const disconnect = useCallback(() => {
    deviceLogger.info(`Disconnecting...`)
    const currentMeshDevice = bleMeshDevice
    const currentBleDevice = bleDevice
    setBleDevice(undefined)
    setBleMeshDevice(undefined)
    setBleConnectionStatus('not-connected')
    currentBleDevice?.gatt?.disconnect()
    currentMeshDevice?.disconnect()
  }, [bleDevice, bleMeshDevice])

  useEffect(() => {
    if (!bleDevice) {
      setBleConnectionStatus('not-connected')
      return
    }
    ;(async () => {
      try {
        deviceLogger.info(`Got device ${bleDevice.name} (${bleDevice.id})...`)
        const transport = await TransportWebBluetooth.createFromDevice(bleDevice)
        deviceLogger.info(`Got transport from device, creating MeshDevice instance...`)
        // @ts-expect-error -- TS2345: Argument of type TransportWebBluetooth is not assignable to parameter of type Transport
        const connection = new MeshDevice(transport, Math.floor(Math.random() * 1e9))
        await initializeDevice(connection, false)

        setBleMeshDevice(connection)
        setBleConnectionStatus('connected')
        if (onConnectRef.current) {
          onConnectRef.current(connection)
        }
      } catch (e) {
        console.log(`Error during BLE device connection:`, e)
        deviceLogger.error('Error during BLE device connection:', e)
      }
    })()
    return () => {
      // disconnect()
    }
  }, [bleDevice])

  return (
    <BleDeviceContext.Provider value={{ bleDevice, bleConnectionStatus, bleMeshDevice, scanBLEDevices, disconnect, setOnConnect }}>
      {children}
    </BleDeviceContext.Provider>
  )
}

export function useBleDevice(options?: { onConnect?: (device: MeshDevice) => void }) {
  const ctx = useContext(BleDeviceContext)
  if (!ctx) {
    throw new Error('useBleDevice must be used within a BleDeviceProvider')
  }
  // Set the callback if provided
  if (options?.onConnect) {
    ctx.setOnConnect(options.onConnect)
  }
  return ctx
}
