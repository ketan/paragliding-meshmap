import { useState } from 'react'
import { deviceLogger } from '../hooks/device-setup-hooks.ts'
import { MeshDevice } from '@meshtastic/core'
import { sleep } from '../utils/ui-util.tsx'
import { ConnectionOperationButton } from './connection-operation-button.tsx'
import { IconCheckbox } from '@tabler/icons-react'
import { UsbStatusIcon } from './usb-status-icon.tsx'
import { BluetoothStatusIcon } from './bluetooth-status-icon.tsx'
import { useSerialDevice } from '../hooks/SerialDeviceContext.tsx'
import { useBleDevice } from '../hooks/BleDeviceContext.tsx'
import { ProcessState } from '../hooks/device-connection'

async function factoryReset(connection: MeshDevice, setFactoryResetInProgress: (state: ProcessState) => void) {
  await sleep(1000)
  setFactoryResetInProgress('in-progress')
  deviceLogger.info('factory resetting the device...')
  await sleep(1000)
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
  const [factoryResetStateUsb, setFactoryResetStateUsb] = useState<ProcessState>('not-started')

  // Use custom hooks for BLE and Serial setup
  const { bleConnectionStatus, scanBLEDevices } = useBleDevice({
    onConnect: (device) => factoryReset(device, setFactoryResetStateBle),
  })

  const { serialConnectionStatus, scanSerialDevices } = useSerialDevice({
    onConnect: (device) => factoryReset(device, setFactoryResetStateUsb),
  })

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

            <div className="flex gap-4 text-white">
              {resetType === 'bluetooth' && (
                <ConnectionOperationButton
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
                  // label="Reset using Bluetooth (warning: may not work)"
                  icon={({ inProgress, processCompleted }) =>
                    processCompleted ? <IconCheckbox /> : <BluetoothStatusIcon inProgress={inProgress} />
                  }
                />
              )}
              {resetType === 'usb' && (
                <ConnectionOperationButton
                  connectionStatus={serialConnectionStatus}
                  onButtonClicked={scanSerialDevices}
                  processState={factoryResetStateUsb}
                  setFactoryResetState={setFactoryResetStateUsb}
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
