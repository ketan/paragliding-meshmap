import { FieldValues } from 'react-hook-form'
import { errorClassNames, groupClassNames, helpTextClassNames, inputClassNames, labelClassNames } from '../utils/form-helpers.tsx'
import { FormFieldProps } from './form-field.tsx'

interface CountryDropdownProps<FV extends FieldValues> extends FormFieldProps<FV> {
  countries: { code: string; name: string }[]
}

export function CountryDropdown<FV extends FieldValues>({ id, label, register, errors, countries, helpText }: CountryDropdownProps<FV>) {
  return (
    <div className={groupClassNames}>
      <select id={String(id)} className={inputClassNames} {...register(id)} aria-invalid={errors[id] ? 'true' : 'false'}>
        <option value="">Select a country</option>
        {countries.map((country) => (
          <option key={country.code} value={country.name}>
            {country.name}
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
