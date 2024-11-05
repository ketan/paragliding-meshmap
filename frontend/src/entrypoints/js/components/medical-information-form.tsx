import { DeepRequired, FieldErrorsImpl, GlobalError, UseFormRegister } from 'react-hook-form'
import { ProfileFormDataWithoutProfileImage } from './profile-modal.tsx'
import { fieldsetClassNames, legendClassNames } from '../utils/form-helpers.tsx'
import { FormField } from './form-field.tsx'

interface MedicalInformationFormProps {
  register: UseFormRegister<ProfileFormDataWithoutProfileImage>
  errors: Partial<FieldErrorsImpl<DeepRequired<ProfileFormDataWithoutProfileImage>>> & {
    root?: Record<string, GlobalError> & GlobalError
  }
}

export function MedicalInformationForm({ register, errors }: MedicalInformationFormProps) {
  return (
    <fieldset className={fieldsetClassNames}>
      <legend className={legendClassNames}>Medical Information</legend>

      <FormField
        id="medicalConditions"
        label="Any Known Medical Conditions"
        register={register}
        errors={errors}
        helpText="Enter any known medical conditions."
      />

      <FormField
        id="medications"
        label="Medications"
        register={register}
        errors={errors}
        helpText="Enter any medications you are taking."
      />

      <FormField id="allergies" label="Allergies" register={register} errors={errors} helpText="Enter any allergies you have." />

      <FormField id="bloodGroup" label="Blood Group" register={register} errors={errors} helpText="Enter your blood group." />
    </fieldset>
  )
}
