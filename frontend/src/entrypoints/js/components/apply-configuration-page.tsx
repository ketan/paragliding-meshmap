import { ReactNode, useEffect, useRef, useState } from 'react'
import { MeshDevice } from '@meshtastic/core'
import { IconCheckbox } from '@tabler/icons-react'
import { deviceLogger } from '../hooks/device-setup-hooks'
import { ConnectionOperationButton } from './connection-operation-button.tsx'
import { BluetoothStatusIcon } from './bluetooth-status-icon.tsx'
import { UsbStatusIcon } from './usb-status-icon.tsx'
import { FormInputs } from './config-form-page.tsx'
import { DeviceConnectionState, ProcessState } from '../hooks/device-connection'
import { useDisconnect } from '../hooks/use-disconnect.tsx'
import { useBle } from '../hooks/use-ble.tsx'
import { useSerial } from '../hooks/use-serial.tsx'
import { getProgressMessage, LogEvent, configureDevice } from '../utils/device-helpers.ts'
import _ from 'lodash'

interface ApplyConfigurationPageParams {
  formData: FormInputs
  resetType: 'bluetooth' | 'usb'
}

function RenderProgress({ logEvents, progress: progress, suffix }: { suffix: string; progress: [number, number]; logEvents: LogEvent[] }) {
  if (progress[1] === 0) {
    return <span>{suffix}</span>
  }
  return (
    <div>
      <span>{suffix}</span>
      <br />
      <span>
        Step {progress[0]} of {progress[1]} -
      </span>{' '}
      <span>{_.last(logEvents)?.message}</span>
    </div>
  )
}

export function ApplyConfigurationPage({ formData, resetType }: ApplyConfigurationPageParams) {
  const [bleConfigurationProcessState, setBleConfigurationProcessState] = useState<ProcessState>('not-started')
  const [usbConfigurationProcessState, setUsbConfigurationProcessState] = useState<ProcessState>('not-started')

  const [bleConnectionStatus, setBleConnectionStatus] = useState<DeviceConnectionState>('not-connected')
  const [serialConnectionStatus, setSerialConnectionStatus] = useState<DeviceConnectionState>('not-connected')
  const [progress, setProgress] = useState<[number, number]>([0, 0])
  const [statusMessages, setStatusMessages] = useState<LogEvent[]>([])
  const statusMessagesRef = useRef<LogEvent[]>([])
  const logStatus = (msg: string, ...args: unknown[]) => {
    statusMessagesRef.current = [...statusMessagesRef.current, { time: new Date(), message: msg }]
    setStatusMessages([...statusMessagesRef.current])
    deviceLogger.info(msg, ...args)
  }

  const bleConnection = useRef<MeshDevice | undefined>(undefined)
  const serialConnection = useRef<MeshDevice | undefined>(undefined)

  const disconnect = useDisconnect(bleConnection, serialConnection)

  useEffect(() => {
    if (bleConnectionStatus === 'connecting' || serialConnectionStatus === 'connecting') {
      setProgress([0, 0])
      statusMessagesRef.current = []
      setStatusMessages([])
    }
  }, [bleConnectionStatus, serialConnectionStatus])

  const scanBLEDevices = useBle({
    setStatus: setBleConnectionStatus,
    disconnect,
    connectionRef: bleConnection,
    onConnect: async (device) => await configureDevice(device, formData, setBleConfigurationProcessState, logStatus, setProgress),
    logStatus,
  })

  const scanSerialDevices = useSerial({
    setStatus: setSerialConnectionStatus,
    disconnect,
    connectionRef: serialConnection,
    onConnect: async (device) => await configureDevice(device, formData, setUsbConfigurationProcessState, logStatus, setProgress),
    logStatus,
  })

  useEffect(() => {
    return () => {
      disconnect()
    }
  }, [disconnect])

  const [errorMessage, _setErrorMessage] = useState<ReactNode>()

  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'auto' })
    }
  }, [statusMessages])

  return (
    <div className="text-sm md:text-md">
      <div className="block w-full sm:text-sm">
        <div className="rounded-md shadow-sm p-4">
          <div className="pl-2">
            <p className="font-semibold text-base text-center pb-4">Apply configuration</p>

            <div className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-yellow-200 mb-8">
              <p className="font-semibold text-base">Before you proceed!</p>
              <ul className="list-disc list-inside space-y-1 md:text-sm text-xs">
                <li>Restart your meshtastic device.</li>
                <li>Wait 30 seconds for it to start up.</li>
                {resetType === 'usb' && <li>Disconnect and reconnect the USB cable.</li>}
                <li>Then, attempt to configure the device.</li>
                <li>
                  If this computer or phone cannot pair with your meshtastic device, try &#34;forgetting&#34; the bluetooth device from your
                  phone or computer settings.
                </li>
              </ul>
            </div>

            {errorMessage && <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{errorMessage}</div>}

            <div className="flex gap-4 text-white">
              {resetType === 'bluetooth' && (
                <ConnectionOperationButton
                  progressMessage={() => {
                    const suffix = getProgressMessage(bleConnectionStatus, bleConfigurationProcessState, 'Bluetooth', 'configuration')
                    return <RenderProgress suffix={suffix} progress={progress} logEvents={statusMessages} />
                  }}
                  connectionStatus={bleConnectionStatus}
                  onButtonClicked={scanBLEDevices}
                  processState={bleConfigurationProcessState}
                  label={({ processCompleted }) => {
                    if (processCompleted) {
                      return 'Configure completed - wait for device to reboot!'
                    } else {
                      return 'Configure using Bluetooth (warning: may not work)'
                    }
                  }}
                  icon={({ inProgress, processCompleted }) =>
                    processCompleted ? <IconCheckbox /> : <BluetoothStatusIcon inProgress={inProgress} />
                  }
                  setFactoryResetState={setBleConfigurationProcessState}
                />
              )}

              {resetType === 'usb' && (
                <ConnectionOperationButton
                  progressMessage={() => {
                    const suffix = getProgressMessage(serialConnectionStatus, usbConfigurationProcessState, 'USB', 'configuration')
                    return <RenderProgress suffix={suffix} progress={progress} logEvents={statusMessages} />
                  }}
                  connectionStatus={serialConnectionStatus}
                  onButtonClicked={scanSerialDevices}
                  processState={usbConfigurationProcessState}
                  label={({ processCompleted }) => {
                    if (processCompleted) {
                      return 'Configure completed - wait for device to reboot!'
                    } else {
                      return 'Configure using USB (recommended)'
                    }
                  }}
                  icon={({ inProgress, processCompleted }) =>
                    processCompleted ? <IconCheckbox /> : <UsbStatusIcon inProgress={inProgress} />
                  }
                  setFactoryResetState={setUsbConfigurationProcessState}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {/**/}
      <div className="mt-6 max-h-32 overflow-y-auto bg-gray-50 border border-gray-200 rounded p-2 text-xs text-gray-700 font-mono">
        {statusMessages.map((event, idx) => (
          <div key={idx}>
            {event.time.toLocaleTimeString()} - {event.message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}
