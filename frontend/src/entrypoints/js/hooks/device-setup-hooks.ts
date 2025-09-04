import { useCallback, useEffect, useState } from 'react'
import { TransportWebSerial } from '@meshtastic/transport-web-serial'
import { MeshDevice } from '@meshtastic/core'
import * as Protobuf from '@meshtastic/protobufs'
import { Logger } from 'tslog'
import { TransportWebBluetooth } from '@meshtastic/transport-web-bluetooth'
import { DeviceConnectionState } from './device-connection'
import { initializeDevice } from '../utils/initialize-device.ts'

export const deviceLogger = new Logger({
  name: 'meshmap:device',
  prettyLogTemplate: '{{hh}}:{{MM}}:{{ss}}:{{ms}}\t{{logLevelName}}\t[{{name}}]\t',
})

const meshtasticServiceID = TransportWebBluetooth.ServiceUuid

export function useBleSetup({ onConnect }: { onConnect: (connection: MeshDevice) => void }) {
  const [bleDevice, setBleDevice] = useState<BluetoothDevice>()
  const [bleConnectionStatus, setBleConnectionStatus] = useState<DeviceConnectionState>('not-connected')
  const [bleMeshDevice, setBleMeshDevice] = useState<MeshDevice>()

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
  }, [bleDevice, bleMeshDevice, setBleDevice, setBleMeshDevice, setBleConnectionStatus])

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
        const connection = new MeshDevice(transport, randomId())

        setBleMeshDevice(connection)
        setBleConnectionStatus('connected')
        onConnect(connection)
        await initializeDevice(connection, false)
      } catch (e) {
        deviceLogger.error('Error during BLE device connection:', e)
        disconnect()
      }
    })()

    return () => {
      disconnect()
    }
  }, [bleDevice, disconnect, onConnect])

  return { bleDevice, bleConnectionStatus, bleMeshDevice, scanBLEDevices }
}

export function useSerialSetup({ onConnect }: { onConnect: (connection: MeshDevice) => void }) {
  const [serialDevice, setSerialDevice] = useState<SerialPort>()
  const [serialConnectionStatus, setSerialConnectionStatus] = useState<DeviceConnectionState>('not-connected')
  const [serialMeshDevice, setSerialMeshDevice] = useState<MeshDevice>()

  const scanSerialDevices = useCallback(async () => {
    deviceLogger.info('Scanning for serial devices...')
    setSerialConnectionStatus('connecting')

    try {
      const port = await navigator.serial.requestPort({})
      if (port) {
        setSerialConnectionStatus('connected')
        setSerialDevice(port)
      } else {
        setSerialConnectionStatus('not-connected')
      }
    } catch (e) {
      deviceLogger.error('Error during serial device scan or connection:', e)
      setSerialConnectionStatus('not-connected')
    }
  }, [])

  const disconnect = useCallback(() => {
    const currentMeshDevice = serialMeshDevice
    setSerialDevice(undefined)
    setSerialMeshDevice(undefined)
    setSerialConnectionStatus('not-connected')
    currentMeshDevice?.disconnect()
  }, [setSerialDevice, setSerialMeshDevice, setSerialConnectionStatus, serialMeshDevice])

  useEffect(() => {
    if (!serialDevice) {
      setSerialConnectionStatus('not-connected')
      return
    }
    ;(async () => {
      try {
        const transport = await TransportWebSerial.createFromPort(serialDevice)
        deviceLogger.info(`Connected to serial device, creating MeshDevice instance...`)
        const connection = new MeshDevice(transport, randomId())
        await initializeDevice(connection, false)
        setSerialMeshDevice(connection)
        setSerialConnectionStatus('connected')
        onConnect(connection)
      } catch (e) {
        deviceLogger.error('Error during serial device connection:', e)
        disconnect()
      }
    })()
    return () => {
      disconnect()
    }
  }, [disconnect, onConnect, serialDevice])

  return { serialDevice, serialConnectionStatus, serialMeshDevice, scanSerialDevices }
}

function randomId() {
  return Math.floor(Math.random() * 1e9)
}

// @ts-ignore
function _subscribeAll(connection: MeshDevice) {
  connection.events.onRoutingPacket.subscribe((routingPacket) => {
    switch (routingPacket.data.variant.case) {
      case 'errorReason': {
        if (routingPacket.data.variant.value === Protobuf.Mesh.Routing_Error.NONE) {
          return
        }
        deviceLogger.error(`Routing Error: ${routingPacket.data.variant.value}`)
        break
      }
      case 'routeReply': {
        deviceLogger.error(`Route Reply: ${routingPacket.data.variant.value}`)
        break
      }
      case 'routeRequest': {
        deviceLogger.error(`Route Request: ${routingPacket.data.variant.value}`)
        break
      }
    }
  })

  connection.events.onDeviceMetadataPacket.subscribe((packet) => {
    console.log(packet)
  })
  connection.events.onTelemetryPacket.subscribe((packet) => {
    console.log(packet)
  })
  connection.events.onDeviceStatus.subscribe((packet) => {
    console.log(packet)
  })
  connection.events.onWaypointPacket.subscribe((packet) => {
    console.log(packet)
  })
  connection.events.onMyNodeInfo.subscribe((packet) => {
    console.log(packet)
  })
  connection.events.onUserPacket.subscribe((packet) => {
    console.log(packet)
  })
  connection.events.onPositionPacket.subscribe((packet) => {
    console.log(packet)
  })
  connection.events.onNodeInfoPacket.subscribe((packet) => {
    console.log(packet)
  })
  connection.events.onChannelPacket.subscribe((packet) => {
    console.log(packet)
  })
  connection.events.onConfigPacket.subscribe((packet) => {
    console.log(packet)
  })
  connection.events.onModuleConfigPacket.subscribe((packet) => {
    console.log(packet)
  })
  connection.events.onMessagePacket.subscribe((packet) => {
    console.log(packet)
  })
  connection.events.onTraceRoutePacket.subscribe((packet) => {
    console.log(packet)
  })
  connection.events.onPendingSettingsChange.subscribe((packet) => {
    console.log(packet)
  })
  connection.events.onMeshPacket.subscribe((packet) => {
    console.log(packet)
  })

  connection.events.onRoutingPacket.subscribe((routingPacket) => {
    if (routingPacket.data.variant.case === 'errorReason') {
      switch (routingPacket.data.variant.value) {
        case Protobuf.Mesh.Routing_Error.MAX_RETRANSMIT:
          console.error(`Routing Error: ${routingPacket.data.variant.value}`)
          break
        case Protobuf.Mesh.Routing_Error.NO_CHANNEL:
          console.error(`Routing Error: ${routingPacket.data.variant.value}`)
          break
        case Protobuf.Mesh.Routing_Error.PKI_UNKNOWN_PUBKEY:
          console.error(`Routing Error: ${routingPacket.data.variant.value}`)
          break
        default: {
          break
        }
      }
    }
  })
}
