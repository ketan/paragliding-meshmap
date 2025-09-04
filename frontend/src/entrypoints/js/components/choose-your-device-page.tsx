import { ResetType } from './config-modal.tsx'
import { twMerge } from 'tailwind-merge'
import { IconBluetooth, IconBrandAndroid, IconUsb } from '@tabler/icons-react'
import { ReactNode } from 'react'

interface ChooseYourDevicePageProps {
  resetType: ResetType
  setResetType: (value: ResetType) => void
}

const hasBluetooth = 'bluetooth' in navigator
const hasSerial = 'serial' in navigator

const choices: { label: ReactNode; value: ResetType; icon: ReactNode }[] = [
  {
    label: <span>Configure using an Android App</span>,
    value: 'android',
    icon: <IconBrandAndroid className="w-6 h-6" />,
  },
  {
    label: <span>Configure using Bluetooth{!hasBluetooth ? ' (Available only in chrome)' : ''}</span>,
    value: 'bluetooth',
    icon: <IconBluetooth className="w-6 h-6" />,
  },
  {
    label: <span>Configure using USB{!hasSerial ? ' (Available only in chrome on desktop)' : ''}</span>,
    value: 'usb',
    icon: <IconUsb className="w-6 h-6" />,
  },
]

export function ChooseYourDevicePage({ resetType, setResetType }: ChooseYourDevicePageProps) {
  return (
    <div className="text-sm md:text-md flex flex-col items-center justify-center min-h-[300px]">
      <div className="block w-full sm:text-sm">
        <div className="rounded-md shadow-sm p-4">
          <div className="pl-2 flex flex-col items-center gap-3">
            <p className="font-semibold text-base text-center pb-4">Factory Reset Your Device</p>
            {choices.map((choice) => (
              <button
                key={choice.value}
                onClick={() => setResetType(choice.value)}
                className={twMerge(
                  `max-w-md mx-auto py-3 px-6 mb-2 border-2 rounded-lg transition-colors duration-150 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center`,
                  resetType === choice.value
                    ? 'border-blue-600 bg-blue-50 text-blue-900'
                    : 'border-gray-300 bg-white text-gray-900 hover:border-blue-400 hover:bg-blue-100'
                )}
                disabled={(choice.value === 'bluetooth' && !hasBluetooth) || (choice.value === 'usb' && !hasSerial)}
              >
                {choice.icon}
                <span className="pl-4">{choice.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
