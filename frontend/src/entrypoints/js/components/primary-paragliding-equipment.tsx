import { UseFormReturn } from 'react-hook-form'
import { fieldsetClassNames, legendClassNames } from '../utils/form-helpers.tsx'
import { FormField } from './form-field.tsx'
import { ProfileFormValidation } from './profile-modal-interfaces.ts'

interface PrimaryParaglidingEquipmentFormProps {
  form: UseFormReturn<ProfileFormValidation>
}

export function PrimaryParaglidingEquipmentForm({ form }: PrimaryParaglidingEquipmentFormProps) {
  return (
    <fieldset className={fieldsetClassNames}>
      <legend className={legendClassNames}>Describe your primary paragliding equipment</legend>

      <FormField
        id="paraglider1Manufacturer"
        label="Manufacturer"
        register={form.register}
        errors={form.formState.errors}
        helpText="Enter the manufacturer of your primary paraglider."
      />

      <FormField
        id="paraglider1Model"
        label="Model"
        register={form.register}
        errors={form.formState.errors}
        helpText="Enter the model of your primary paraglider."
      />

      <FormField
        id="paraglider1PrimaryColor"
        label="Primary Colour"
        register={form.register}
        errors={form.formState.errors}
        helpText="Enter the primary color of your primary paraglider."
      />

      <FormField
        id="paraglider1SecondaryColor"
        label="Secondary Colour"
        register={form.register}
        errors={form.formState.errors}
        helpText="Enter the secondary color of your primary paraglider."
      />
    </fieldset>
  )
}
