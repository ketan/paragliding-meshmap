import { UseFormReturn } from 'react-hook-form'
import { countries, fieldsetClassNames, legendClassNames } from '../utils/form-helpers.tsx'
import { FormField } from './form-field.tsx'
import { CountryDropdown } from './country-dropdown.tsx'
import { ProfileFormValidation } from './profile-modal-interfaces.ts'

interface AddressFormProps {
  form: UseFormReturn<ProfileFormValidation>
}

export function AddressForm({ form }: AddressFormProps) {
  return (
    <fieldset className={fieldsetClassNames}>
      <legend className={legendClassNames}>Your address</legend>

      <FormField
        id="address1"
        label="Address Line 1"
        register={form.register}
        errors={form.formState.errors}
        helpText="Enter the first line of your address."
      />
      <FormField
        id="address2"
        label="Address Line 2"
        register={form.register}
        errors={form.formState.errors}
        helpText="Enter the second line of your address."
      />
      <FormField id="city" label="City" register={form.register} errors={form.formState.errors} helpText="Enter your city." />
      <FormField
        id="state"
        label="State/Province"
        register={form.register}
        errors={form.formState.errors}
        helpText="Enter your state or province."
      />
      <FormField
        id="postalCode"
        label="Postal Code"
        register={form.register}
        errors={form.formState.errors}
        helpText="Enter your postal code."
      />
      <CountryDropdown
        id="country"
        label="Country"
        countries={countries}
        register={form.register}
        errors={form.formState.errors}
        helpText="Select your country."
      />
    </fieldset>
  )
}
