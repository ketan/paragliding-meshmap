import { IconUsb } from '@tabler/icons-react'

export function UsbStatusIcon({ inProgress }: { inProgress: boolean }) {
  return <IconUsb className={`w-10 h-10 ${inProgress ? ' animate-pulse' : ''}`} />
}
