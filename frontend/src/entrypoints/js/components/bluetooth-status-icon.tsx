import { IconBluetooth } from '@tabler/icons-react'

export function BluetoothStatusIcon({ inProgress }: { inProgress: boolean }) {
  return <IconBluetooth className={`w-10 h-10 ${inProgress ? ' animate-pulse' : ''}`} />
}
