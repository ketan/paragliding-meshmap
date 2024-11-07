import { UseFormReturn } from 'react-hook-form'
import { ProfileFormDataWithoutProfileImage } from './profile-modal.tsx'
import { fieldsetClassNames, legendClassNames } from '../utils/form-helpers.tsx'
import { FormField } from './form-field.tsx'

interface EmergencyContactFormProps {
  form: UseFormReturn<ProfileFormDataWithoutProfileImage>
}

export function EmergencyContactForm({ form }: EmergencyContactFormProps) {
  return (
    <fieldset className={fieldsetClassNames}>
      <legend className={legendClassNames}>Emergency contact(s)</legend>

      <FormField
        id="primaryEmergencyContactName"
        label="Primary Emergency Contact Name"
        register={form.register}
        errors={form.formState.errors}
        helpText="Enter the name of your primary emergency contact."
      />

      <FormField
        type="tel"
        id="primaryEmergencyContactPhone"
        label="Primary Emergency Contact Phone Number"
        register={form.register}
        errors={form.formState.errors}
        helpText="Enter the phone number of your primary emergency contact."
      />

      <FormField
        id="secondaryEmergencyContactName"
        label="Secondary Emergency Contact Name"
        register={form.register}
        errors={form.formState.errors}
        helpText="Enter the name of your secondary emergency contact."
      />

      <FormField
        type="tel"
        id="secondaryEmergencyContactPhone"
        label="Secondary Emergency Contact Phone Number"
        register={form.register}
        errors={form.formState.errors}
        helpText="Enter the phone number of your secondary emergency contact."
      />
    </fieldset>
  )
}
