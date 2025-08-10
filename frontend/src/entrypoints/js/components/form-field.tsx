import { FieldErrors, FieldPath, FieldValues, UseFormRegister } from 'react-hook-form'
import { errorClassNames, groupClassNames, helpTextClassNames, inputClassNames, labelClassNames } from '../utils/form-helpers.tsx'
import { DetailedHTMLProps, HTMLInputTypeAttribute, InputHTMLAttributes } from 'react'
import { phoneNumberFormatOnBlur } from './profile-modal-interfaces.ts'

export interface FormFieldProps<FV extends FieldValues> {
  id: FieldPath<FV>
  label: string
  type?: HTMLInputTypeAttribute
  register: UseFormRegister<FV>
  errors: FieldErrors<FV>
  placeholder?: string
  helpText: string
  disabled?: boolean
}

const extensionToContentTypeMap = {
  pdf: 'application/pdf',
  jpg: 'image/jpeg',
  png: 'image/png',
  tif: 'image/tiff',
}

export function FormField<FV extends FieldValues>({ id, label, type = 'text', register, errors, helpText, disabled }: FormFieldProps<FV>) {
  const extraOpts: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> = {}

  if (type === 'tel') {
    extraOpts.onBlur = phoneNumberFormatOnBlur
  } else if (type === 'file') {
    extraOpts.accept = Object.values(extensionToContentTypeMap).join(' ')
  }

  const errorMessages = errors[id]?.message
  if (errorMessages && typeof errorMessages !== 'string') {
    throw 'errorMessages must be a string'
  }

  return (
    <div className={groupClassNames}>
      <input
        type={type || 'text'}
        id={String(id)}
        {...register(id)}
        autoCapitalize="off"
        autoComplete="off"
        disabled={disabled}
        readOnly={disabled}
        placeholder={' '}
        aria-invalid={errors[id] ? 'true' : 'false'}
        className={inputClassNames + (disabled ? ' opacity-50 bg-gray-200!' : ' ')}
        {...extraOpts}
      />
      <label htmlFor={String(id)} className={labelClassNames + (disabled ? ' text-black! ' : ' ')}>
        {label}
      </label>
      {errors[id] && <p className={errorClassNames}>{errorMessages}</p>}
      <p className={helpTextClassNames}>{helpText}</p>
    </div>
  )
}
