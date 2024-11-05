import { DeepRequired, FieldErrorsImpl, GlobalError, UseFormRegister } from 'react-hook-form'
import { ProfileFormDataWithoutProfileImage } from './profile-modal.tsx'
import { fieldsetClassNames, legendClassNames } from '../utils/form-helpers.tsx'
import { FormField } from './form-field.tsx'

interface EmergencyContactFormProps {
  register: UseFormRegister<ProfileFormDataWithoutProfileImage>

  errors: Partial<FieldErrorsImpl<DeepRequired<ProfileFormDataWithoutProfileImage>>> & {
    root?: Record<string, GlobalError> & GlobalError
  }
}

export function EmergencyContactForm({ register, errors }: EmergencyContactFormProps) {
  return (
    <fieldset className={fieldsetClassNames}>
      <legend className={legendClassNames}>Emergency contact(s)</legend>

      <FormField
        id="primaryEmergencyContactName"
        label="Primary Emergency Contact Name"
        register={register}
        errors={errors}
        helpText="Enter the name of your primary emergency contact."
      />

      <FormField
        type="tel"
        id="primaryEmergencyContactPhone"
        label="Primary Emergency Contact Phone Number"
        register={register}
        errors={errors}
        helpText="Enter the phone number of your primary emergency contact."
      />

      <FormField
        id="secondaryEmergencyContactName"
        label="Secondary Emergency Contact Name"
        register={register}
        errors={errors}
        helpText="Enter the name of your secondary emergency contact."
      />

      <FormField
        type="tel"
        id="secondaryEmergencyContactPhone"
        label="Secondary Emergency Contact Phone Number"
        register={register}
        errors={errors}
        helpText="Enter the phone number of your secondary emergency contact."
      />
    </fieldset>
  )
}
