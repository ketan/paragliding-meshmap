import { ReactNode, useEffect, useState } from 'react'

export interface WizardStep {
  name: string
  description?: string
  component: ReactNode
}

export interface WizardProps {
  steps: WizardStep[]
  onStepChange?: (step: number) => void
  canProceed: boolean
  stepNumber: number
}

export function Wizard({ steps, onStepChange, canProceed = true, stepNumber = 0 }: WizardProps) {
  const [step, setStep] = useState(stepNumber)

  useEffect(() => {
    if (onStepChange) {
      onStepChange(step)
    }
  }, [step, onStepChange])

  return (
    <>
      <div>
        {steps[step].component}
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            Back
          </button>
          {step === steps.length - 1 ? (
            <button type="button" onClick={() => onStepChange && onStepChange(-1)} className="px-3 py-1 bg-red-200 rounded">
              Close
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
              disabled={!canProceed}
              className="px-3 py-1 bg-blue-200 rounded"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </>
  )
}
