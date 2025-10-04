import { useEffect, useRef, useState } from 'react'
import { deviceLogger } from '../hooks/device-setup-hooks.ts'
import { MeshDevice } from '@meshtastic/core'
import { sleep } from '../utils/ui-util.tsx'
import { ConnectionOperationButton } from './connection-operation-button.tsx'
import { IconCheckbox } from '@tabler/icons-react'
import { BluetoothStatusIcon } from './bluetooth-status-icon.tsx'
import { DeviceConnectionState, ProcessState } from '../hooks/device-connection'
import { UsbStatusIcon } from './usb-status-icon.tsx'
import { useDisconnect } from '../hooks/use-disconnect.tsx'
import { useSerial } from '../hooks/use-serial.tsx'
import { useBle } from '../hooks/use-ble.tsx'
import { getProgressMessage } from '../utils/device-helpers.ts'

async function factoryReset(connection: MeshDevice, setFactoryResetInProgress: (state: ProcessState) => void) {
  deviceLogger.info("Starting factory reset process in 10 seconds. Don't move or disconnect the device...")
  setFactoryResetInProgress('in-progress')
  deviceLogger.info('issuing a factory reset command...')
  connection.factoryResetConfig()
  await sleep(4000)
  deviceLogger.info('Done...')
  setFactoryResetInProgress('done')
}

interface FactoryResetPageProps {
  resetType: 'android' | 'bluetooth' | 'usb'
}

export function FactoryResetPage({ resetType }: FactoryResetPageProps) {
  const [factoryResetStateBle, setFactoryResetStateBle] = useState<ProcessState>('not-started')
  const [factoryResetStateUsb, setfactoryResetStateUsb] = useState<ProcessState>('not-started')

  const [bleConnectionStatus, setBleConnectionStatus] = useState<DeviceConnectionState>('not-connected')
  const [serialConnectionStatus, setSerialConnectionStatus] = useState<DeviceConnectionState>('not-connected')

  const bleConnection = useRef<MeshDevice | undefined>(undefined)
  const serialConnection = useRef<MeshDevice | undefined>(undefined)

  const disconnect = useDisconnect(bleConnection, serialConnection)

  const scanBLEDevices = useBle({
    setStatus: setBleConnectionStatus,
    disconnect,
    connectionRef: bleConnection,
    onConnect: async (device) => await factoryReset(device, setFactoryResetStateBle),
    logStatus: (msg, ...args) => deviceLogger.info(msg, ...args),
    setDeviceMetadata: () => {},
  })

  const scanSerialDevices = useSerial({
    setStatus: setSerialConnectionStatus,
    disconnect,
    connectionRef: serialConnection,
    onConnect: async (device) => await factoryReset(device, setfactoryResetStateUsb),
    logStatus: (msg, ...args) => deviceLogger.info(msg, ...args),
    setDeviceMetadata: () => {},
  })

  useEffect(() => {
    return () => {
      disconnect()
    }
  }, [disconnect])

  return (
    <div className="text-sm md:text-md">
      <div className="block w-full sm:text-sm">
        <div className="rounded-md shadow-sm p-4">
          <div className="pl-2">
            <p className="font-semibold text-base text-center pb-4">Factory Reset Your Device</p>

            <div className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-yellow-200 mb-8">
              <p className="font-semibold text-base">Before you proceed!</p>
              <ul className="list-disc list-inside space-y-1 md:text-sm text-xs">
                <li>Restart your meshtastic device.</li>
                <li>Wait 30 seconds for it to start up.</li>
                {resetType === 'usb' && <li>Disconnect and reconnect the USB cable.</li>}
                <li>Then attempt a factory reset.</li>
                <li>If factory reset succeeds, you whould see the device rebooting...</li>
                <li>
                  If this computer or phone cannot pair with your meshtastic device, try &#34;forgetting&#34; the bluetooth device from your
                  phone or computer settings and try again.
                </li>
              </ul>
            </div>
            <div className="flex gap-4">
              {resetType === 'bluetooth' && (
                <ConnectionOperationButton
                  progressMessage={() => getProgressMessage(bleConnectionStatus, factoryResetStateBle, 'Bluetooth', 'factory reset')}
                  connectionStatus={bleConnectionStatus}
                  onButtonClicked={scanBLEDevices}
                  processState={factoryResetStateBle}
                  setFactoryResetState={setFactoryResetStateBle}
                  label={({ processCompleted }) => {
                    if (processCompleted) {
                      return 'Factory Reset Completed - wait for device to reboot!'
                    } else {
                      return 'Reset using Bluetooth (warning: may not work)'
                    }
                  }}
                  icon={({ inProgress, processCompleted }) =>
                    processCompleted ? <IconCheckbox /> : <BluetoothStatusIcon inProgress={inProgress} />
                  }
                />
              )}

              {resetType === 'usb' && (
                <ConnectionOperationButton
                  progressMessage={() => getProgressMessage(serialConnectionStatus, factoryResetStateUsb, 'USB', 'factory reset')}
                  connectionStatus={serialConnectionStatus}
                  onButtonClicked={scanSerialDevices}
                  processState={factoryResetStateUsb}
                  setFactoryResetState={setfactoryResetStateUsb}
                  label={({ processCompleted }) => {
                    if (processCompleted) {
                      return 'Factory Reset Completed - wait for device to reboot!'
                    } else {
                      return 'Reset using USB (recommended)'
                    }
                  }}
                  icon={({ inProgress, processCompleted }) =>
                    processCompleted ? <IconCheckbox /> : <UsbStatusIcon inProgress={inProgress} />
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
