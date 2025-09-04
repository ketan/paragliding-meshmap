import { UsbStatusIcon } from './usb-status-icon'

import { DeviceConnectionState } from '../hooks/device-connection'

interface UsbConfigButtonProps {
  serialConnectionStatus: DeviceConnectionState
  scanSerialDevices: () => Promise<void>
}

export function UsbConfigButton({ serialConnectionStatus, scanSerialDevices }: UsbConfigButtonProps) {
  const isConnecting = serialConnectionStatus === 'connecting'
  const isConnected = serialConnectionStatus === 'connected'
  const isDisabled = isConnecting
  const showSpinner = isConnecting
  let label
  if (isConnecting) {
    label = 'Scanning...'
  } else if (isConnected) {
    label = 'USB Connected'
  } else {
    label = 'Configure via USB'
  }
  return (
    <div className="flex-1 flex items-center gap-2 p-2 bg-blue-500 rounded">
      <UsbStatusIcon inProgress={isConnecting} />
      <button
        type="button"
        onClick={scanSerialDevices}
        disabled={isDisabled}
        className="flex-1 text-left py-2 rounded-md inline-flex items-center relative"
        style={{ whiteSpace: 'pre-line' }}
      >
        {showSpinner && <span className="animate-spin mr-2 w-4 h-4 border-2 border-white border-t-blue-500 rounded-full inline-block" />}
        {label}
      </button>
    </div>
  )
}
