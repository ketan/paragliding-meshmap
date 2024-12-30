import { FieldValues } from 'react-hook-form'
import { FormFieldProps } from './form-field.tsx'
import { Dropdown } from './dropdown.tsx'

interface CountryDropdownProps<FV extends FieldValues> extends FormFieldProps<FV> {
  countries: { code: string; name: string }[]
}

export function CountryDropdown<FV extends FieldValues>({ id, label, register, errors, countries, helpText }: CountryDropdownProps<FV>) {
  const options = countries.map((country) => ({ value: country.name, label: country.name }))

  return (
    <Dropdown
      id={id}
      label={label}
      register={register}
      errors={errors}
      defaultOption="Select a country"
      options={options}
      helpText={helpText}
    />
  )
}
