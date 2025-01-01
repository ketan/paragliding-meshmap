import { UseFormReturn } from 'react-hook-form'
import { fieldsetClassNames, legendClassNames } from '../utils/form-helpers.tsx'
import { FormField } from './form-field.tsx'
import { ProfileFormValidation } from './profile-modal-interfaces.ts'

interface MedicalInformationFormProps {
  form: UseFormReturn<ProfileFormValidation>
}

export function MedicalInformationForm({ form }: MedicalInformationFormProps) {
  return (
    <fieldset className={fieldsetClassNames}>
      <legend className={legendClassNames}>Medical Information</legend>

      <FormField
        id="medicalConditions"
        label="Any Known Medical Conditions"
        register={form.register}
        errors={form.formState.errors}
        helpText="Enter any known medical conditions."
      />

      <FormField
        id="medications"
        label="Medications"
        register={form.register}
        errors={form.formState.errors}
        helpText="Enter any medications you are taking."
      />

      <FormField
        id="allergies"
        label="Allergies"
        register={form.register}
        errors={form.formState.errors}
        helpText="Enter any allergies you have."
      />

      <FormField
        id="bloodGroup"
        label="Blood Group"
        register={form.register}
        errors={form.formState.errors}
        helpText="Enter your blood group."
      />
    </fieldset>
  )
}
