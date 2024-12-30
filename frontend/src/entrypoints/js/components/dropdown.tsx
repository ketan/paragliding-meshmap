import { FieldValues } from 'react-hook-form'
import { errorClassNames, groupClassNames, helpTextClassNames, inputClassNames, labelClassNames } from '../utils/form-helpers.tsx'
import { FormFieldProps } from './form-field.tsx'

interface DropdownProps<FV extends FieldValues> extends FormFieldProps<FV> {
  defaultOption?: string
  size?: number
  options: { value: string; label: string }[]
  multiple?: boolean
}

export function Dropdown<FV extends FieldValues>({
  id,
  label,
  register,
  size,
  errors,
  defaultOption,
  options,
  helpText,
  multiple,
}: DropdownProps<FV>) {
  return (
    <div className={groupClassNames}>
      <select
        id={String(id)}
        className={inputClassNames + ' foo'}
        {...register(id)}
        aria-invalid={errors[id] ? 'true' : 'false'}
        multiple={multiple}
        size={(multiple && size) || 0}
      >
        {defaultOption && <option value="">{defaultOption}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label htmlFor={String(id)} className={labelClassNames}>
        {label}
      </label>
      {errors[id] && <p className={errorClassNames}>{errors[id]?.message}</p>}
      <p className={helpTextClassNames}>{helpText}</p>
    </div>
  )
}
