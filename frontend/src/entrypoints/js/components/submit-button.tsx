import { ReactNode } from 'react'
import { CheckIcon, SpinnerIcon, TriangleExclamationIcon } from '../utils/icon-constants.ts'

export type SubmitButtonIcon = 'submitted' | 'submitting' | 'error' | undefined

function iconFor(icon?: SubmitButtonIcon) {
  switch (icon) {
    case 'submitting':
      return <SpinnerIcon className={`w-4 h-4 fill-white animate-spin mr-3`} />
    case 'submitted':
      return <CheckIcon className={`w-4 h-4 fill-white mr-3`} />
    case 'error':
      return <TriangleExclamationIcon className={`w-4 h-4 fill-white mr-3`} />
    default:
      return null
  }
}

function colorFor(icon?: SubmitButtonIcon) {
  switch (icon) {
    case 'submitting':
      return 'bg-blue-600'
    case 'submitted':
      return 'bg-green-600'
    case 'error':
      return 'bg-red-600'
    default:
      return 'bg-blue-500'
  }
}

export function SubmitButton({ children, icon }: { children: ReactNode; icon: SubmitButtonIcon }) {
  return (
    <button type="submit" className={`${colorFor(icon)} text-white py-2 px-4 rounded-md inline-flex items-center relative`}>
      {iconFor(icon)}
      {children}
    </button>
  )
}
