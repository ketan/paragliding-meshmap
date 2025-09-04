import { createContext, ReactNode, useCallback, useContext, useRef, useState } from 'react'
import { TransportWebSerial } from '@meshtastic/transport-web-serial'
import { MeshDevice } from '@meshtastic/core'
import { deviceLogger } from './device-setup-hooks'
import { DeviceConnectionState } from './device-connection'
import { initializeDevice } from '../utils/initialize-device.ts'

interface SerialDeviceContextType {
  serialDevice?: SerialPort
  serialConnectionStatus: DeviceConnectionState
  serialMeshDevice?: MeshDevice
  scanSerialDevices: () => Promise<void>
  disconnect: () => void
  setOnConnect: (cb?: (device: MeshDevice) => void) => void
}

const SerialDeviceContext = createContext<SerialDeviceContextType | undefined>(undefined)

export const SerialDeviceProvider = ({ children }: { children: ReactNode }) => {
  const serialDevice = useRef<SerialPort>(undefined)
  const serialMeshDevice = useRef<MeshDevice>(undefined)
  const onConnectRef = useRef<(device: MeshDevice) => void>(undefined)

  const [serialConnectionStatus, setSerialConnectionStatus] = useState<DeviceConnectionState>('not-connected')

  const setOnConnect = useCallback((cb?: (device: MeshDevice) => void) => {
    onConnectRef.current = cb!
  }, [])

  const disconnect = useCallback(async () => {
    if (serialDevice.current) {
      try {
        await serialDevice.current.close()
      } catch (error) {
        deviceLogger.error('Error closing existing serial device:', error)
      }
    }

    if (serialMeshDevice.current) {
      try {
        await serialMeshDevice.current.disconnect()
      } catch (error) {
        deviceLogger.error('Error disconnecting existing MeshDevice:', error)
      }
    }

    serialDevice.current = undefined
    serialMeshDevice.current = undefined
    setSerialConnectionStatus('not-connected')
  }, [])

  const scanSerialDevices = useCallback(async () => {
    await disconnect()
    deviceLogger.info('Scanning for serial devices...')
    setSerialConnectionStatus('connecting')
    try {
      const port = await navigator.serial.requestPort({})
      deviceLogger.info('Got port from user:', port.getInfo())
      if (port) {
        setSerialConnectionStatus('connected')
        const transport = await TransportWebSerial.createFromPort(port)
        deviceLogger.info(`Connected to serial device, creating MeshDevice instance...`)
        const connection = new MeshDevice(transport, Math.floor(Math.random() * 1e9))
        serialDevice.current = port
        serialMeshDevice.current = connection
        await initializeDevice(connection, false)
        setSerialConnectionStatus('connected')
        if (onConnectRef.current) {
          onConnectRef.current(connection)
        }
      } else {
        setSerialConnectionStatus('not-connected')
      }
    } catch (e) {
      deviceLogger.error('Error during serial device scan or connection:', e)
      setSerialConnectionStatus('not-connected')
    }
  }, [disconnect])

  // useEffect(() => {
  //   if (!serialDevice) {
  //     setSerialConnectionStatus('not-connected')
  //     return
  //   }
  //   ;(async () => {
  //     try {
  //       const transport = await TransportWebSerial.createFromPort(serialDevice)
  //       deviceLogger.info(`Connected to serial device, creating MeshDevice instance...`)
  //       const connection = new MeshDevice(transport, Math.floor(Math.random() * 1e9))
  //       serialMeshDevice.current = connection
  //       setSerialConnectionStatus('connected')
  //       if (onConnectRef.current) {
  //         onConnectRef.current(connection)
  //       }
  //     } catch (e) {
  //       deviceLogger.error('Error during serial device connection:', e)
  //       disconnect()
  //     }
  //   })()
  //   return () => {
  //     disconnect()
  //   }
  // }, [serialDevice, disconnect])

  return (
    <SerialDeviceContext.Provider
      value={{
        serialDevice: serialDevice.current,
        serialConnectionStatus,
        serialMeshDevice: serialMeshDevice.current,
        scanSerialDevices,
        disconnect,
        setOnConnect,
      }}
    >
      {children}
    </SerialDeviceContext.Provider>
  )
}

export function useSerialDevice(options?: { onConnect?: (device: MeshDevice) => void }) {
  const ctx = useContext(SerialDeviceContext)
  if (!ctx) {
    throw new Error('useSerialDevice must be used within a SerialDeviceProvider')
  }
  // Set the callback if provided
  if (options?.onConnect) {
    ctx.setOnConnect(options.onConnect)
  }
  return ctx
}
