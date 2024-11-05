import { DeepRequired, FieldErrorsImpl, GlobalError, UseFormRegister } from 'react-hook-form'
import { ProfileFormDataWithoutProfileImage } from './profile-modal.tsx'
import { fieldsetClassNames, legendClassNames } from '../utils/form-helpers.tsx'
import { FormField } from './form-field.tsx'
import { CountryDropdown } from './country-dropdown.tsx'

interface AddressFormProps {
  register: UseFormRegister<ProfileFormDataWithoutProfileImage>
  countries: { code: string; name: string }[]
  errors: Partial<FieldErrorsImpl<DeepRequired<ProfileFormDataWithoutProfileImage>>> & {
    root?: Record<string, GlobalError> & GlobalError
  }
}

export function AddressForm({ register, countries, errors }: AddressFormProps) {
  return (
    <fieldset className={fieldsetClassNames}>
      <legend className={legendClassNames}>Your address</legend>

      <FormField
        id="address1"
        label="Address Line 1"
        register={register}
        errors={errors}
        helpText="Enter the first line of your address."
      />
      <FormField
        id="address2"
        label="Address Line 2"
        register={register}
        errors={errors}
        helpText="Enter the second line of your address."
      />
      <FormField id="city" label="City" register={register} errors={errors} helpText="Enter your city." />
      <FormField id="state" label="State/Province" register={register} errors={errors} helpText="Enter your state or province." />
      <FormField id="postalCode" label="Postal Code" register={register} errors={errors} helpText="Enter your postal code." />
      <CountryDropdown
        id="country"
        label="Country"
        countries={countries}
        register={register}
        errors={errors}
        helpText="Select your country."
      />
    </fieldset>
  )
}
