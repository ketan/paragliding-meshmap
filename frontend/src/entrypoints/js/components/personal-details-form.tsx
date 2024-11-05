import { DeepRequired, FieldErrorsImpl, GlobalError, UseFormRegister } from 'react-hook-form'
import { ProfileFormDataWithoutProfileImage } from './profile-modal.tsx'
import { fieldsetClassNames, legendClassNames } from '../utils/form-helpers.tsx'
import { FormField } from './form-field.tsx'
import { CountryDropdown } from './country-dropdown.tsx'

interface PersonalDetailsFormProps {
  register: UseFormRegister<ProfileFormDataWithoutProfileImage>
  countries: { name: string; code: string }[]
  errors: Partial<FieldErrorsImpl<DeepRequired<ProfileFormDataWithoutProfileImage>>> & {
    root?: Record<string, GlobalError> & GlobalError
  }
}

export function PersonalDetailsForm({ register, countries, errors }: PersonalDetailsFormProps) {
  return (
    <fieldset className={fieldsetClassNames}>
      <legend className={legendClassNames}>Your personal details</legend>

      <FormField id="displayName" label="Name" register={register} errors={errors} helpText="Please enter your full name." />

      <FormField
        id="email"
        type="email"
        label="Email address"
        register={register}
        errors={errors}
        helpText="Your email address cannot be changed."
        disabled
      />

      <FormField
        id="primaryPhone"
        type="tel"
        label="Primary phone number (with country code)"
        register={register}
        errors={errors}
        helpText="Include your country code, e.g., +1 for USA."
      />

      <FormField
        id="secondaryPhone"
        type="tel"
        label="Secondary phone number (with country code)"
        register={register}
        errors={errors}
        helpText="Include your country code, e.g., +1 for USA."
      />

      <FormField
        id="dob"
        type="date"
        label="Date of Birth"
        register={register}
        errors={errors}
        helpText="Please enter your date of birth."
      />

      <CountryDropdown
        id="nationality"
        type="select"
        label="Nationality"
        register={register}
        errors={errors}
        helpText="Select your nationality from the list."
        countries={countries}
      />

      <FormField
        id="embassyPhone"
        type="tel"
        label="Embassy Phone Number"
        register={register}
        errors={errors}
        helpText="Provide the phone number of your embassy."
      />
    </fieldset>
  )
}
