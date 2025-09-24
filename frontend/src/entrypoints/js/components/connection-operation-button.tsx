import React, { useEffect, useState } from 'react'
import { DeviceConnectionState, ProcessState } from '../hooks/device-connection'

interface Props {
  connectionStatus: DeviceConnectionState
  onButtonClicked: () => Promise<void>
  processState: ProcessState
  label: (props: { inProgress: boolean; processCompleted: boolean }) => React.ReactNode
  icon: (props: { inProgress: boolean; processCompleted: boolean }) => React.ReactNode
  setFactoryResetState: (state: ProcessState) => void
}

export function ConnectionOperationButton({ connectionStatus, onButtonClicked, processState, label, icon, setFactoryResetState }: Props) {
  const [buttonClicked, setButtonClicked] = useState(false)
  const inProgress = (connectionStatus === 'connecting' || processState === 'in-progress') && buttonClicked
  const processCompleted = processState === 'done'

  useEffect(() => {
    if (processState === 'done') {
      setButtonClicked(false)
    }
  }, [processState])

  const buttonColor = processCompleted ? 'bg-green-500' : 'bg-blue-500'

  return (
    <div className={`flex-1 flex items-center gap-2 p-2 rounded ${buttonColor} ${inProgress ? 'animate-pulse' : ''}`}>
      {icon({ inProgress, processCompleted })}
      <button
        type="button"
        onClick={() => {
          setFactoryResetState('not-started')
          setButtonClicked(true)
          onButtonClicked()
        }}
        disabled={inProgress}
        className={`flex-1 text-left py-2 rounded-md inline-flex items-center relative`}
        style={{ whiteSpace: 'pre-line' }}
      >
        {label({ inProgress, processCompleted })}
      </button>
    </div>
  )
}
