import { RefObject, useCallback } from 'react'
import { deviceLogger } from './device-setup-hooks.ts'
import { MeshDevice } from '@meshtastic/core'

export function useDisconnect(bleConnection: RefObject<MeshDevice | undefined>, serialConnection: RefObject<MeshDevice | undefined>) {
  return useCallback(() => {
    if (bleConnection.current) {
      deviceLogger.info('Already have a BLE device, disconnecting')
      bleConnection.current.disconnect()
      bleConnection.current = undefined
    }
    if (serialConnection.current) {
      deviceLogger.info('Already have a Serial device, disconnecting')
      serialConnection.current.disconnect()
      serialConnection.current = undefined
    }
  }, [bleConnection, serialConnection])
}
