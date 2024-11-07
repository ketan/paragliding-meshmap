import { UseFormReturn } from 'react-hook-form'
import { ProfileFormDataWithoutProfileImage } from './profile-modal.tsx'
import { countries, fieldsetClassNames, legendClassNames } from '../utils/form-helpers.tsx'
import { FormField } from './form-field.tsx'
import { CountryDropdown } from './country-dropdown.tsx'

interface PersonalDetailsFormProps {
  form: UseFormReturn<ProfileFormDataWithoutProfileImage>
}

export function PersonalDetailsForm({ form }: PersonalDetailsFormProps) {
  return (
    <fieldset className={fieldsetClassNames}>
      <legend className={legendClassNames}>Your personal details</legend>

      <FormField
        id="displayName"
        label="Name"
        register={form.register}
        errors={form.formState.errors}
        helpText="Please enter your full name."
      />

      <FormField
        id="email"
        type="email"
        label="Email address"
        register={form.register}
        errors={form.formState.errors}
        helpText="Your email address cannot be changed."
        disabled
      />

      <FormField
        id="primaryPhone"
        type="tel"
        label="Primary phone number"
        register={form.register}
        errors={form.formState.errors}
        helpText="Include your country code, e.g., +1 for USA."
      />

      <FormField
        id="secondaryPhone"
        type="tel"
        label="Secondary phone number"
        register={form.register}
        errors={form.formState.errors}
        helpText="Include your country code, e.g., +1 for USA."
      />

      <FormField
        id="dob"
        type="date"
        label="Date of Birth"
        register={form.register}
        errors={form.formState.errors}
        helpText="Please enter your date of birth."
      />

      <CountryDropdown
        id="nationality"
        type="select"
        label="Nationality"
        register={form.register}
        errors={form.formState.errors}
        helpText="Select your nationality from the list."
        countries={countries}
      />

      <FormField
        id="embassyPhone"
        type="tel"
        label="Embassy Phone Number"
        disabled={form.watch('nationality') === 'India'}
        register={form.register}
        errors={form.formState.errors}
        helpText="Provide the phone number of your embassy."
      />
    </fieldset>
  )
}
