import React, { useEffect, useState } from 'react'
import { DeviceConnectionState, ProcessState } from '../hooks/device-connection'
import './connection-operation-button.css'

interface Props {
  connectionStatus: DeviceConnectionState
  onButtonClicked: () => Promise<void>
  processState: ProcessState
  label: (props: { inProgress: boolean; processCompleted: boolean }) => React.ReactNode
  icon: (props: { inProgress: boolean; processCompleted: boolean }) => React.ReactNode
  setFactoryResetState: (state: ProcessState) => void
  progressMessage: () => React.ReactNode
}

export function ConnectionOperationButton({
  connectionStatus,
  onButtonClicked,
  processState,
  label,
  icon,
  setFactoryResetState,
  progressMessage,
}: Props) {
  const [buttonClicked, setButtonClicked] = useState(false)
  const inProgress =
    (connectionStatus === 'connecting' || connectionStatus === 'connected' || processState === 'in-progress') && buttonClicked
  const processCompleted = processState === 'done'

  useEffect(() => {
    if (processState === 'done') {
      setButtonClicked(false)
    }
  }, [processState])

  const buttonColor = processCompleted ? 'bg-green-500' : 'bg-blue-500'

  return (
    <div className={`text-white flex-1 flex items-center gap-2 p-2 rounded ${buttonColor} relative`}>
      {icon({ inProgress, processCompleted })}
      <button
        type="button"
        onClick={() => {
          setFactoryResetState('not-started')
          setButtonClicked(true)
          onButtonClicked()
        }}
        disabled={inProgress}
        className={`flex-1 text-left py-2 rounded-md items-center relative`}
        style={{ whiteSpace: 'pre-line' }}
      >
        {label({ inProgress, processCompleted })}
        {inProgress && (
          <div>
            <span>{progressMessage()}</span>
            <span className="absolute left-0 bottom-0 w-full h-1 overflow-hidden rounded-sm">
              <span className="block h-full w-1/3 bg-white opacity-80 animate-indeterminate-bar" />
            </span>
          </div>
        )}
      </button>
    </div>
  )
}
