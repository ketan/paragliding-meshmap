import { UseFormReturn } from 'react-hook-form'
import { ProfileFormDataWithoutProfileImage } from './profile-modal.tsx'
import { fieldsetClassNames, legendClassNames } from '../utils/form-helpers.tsx'
import { FormField } from './form-field.tsx'

interface SecondaryParaglidingEquipmentFormProps {
  form: UseFormReturn<ProfileFormDataWithoutProfileImage>
}

export function SecondaryParaglidingEquipmentForm({ form }: SecondaryParaglidingEquipmentFormProps) {
  return (
    <fieldset className={fieldsetClassNames}>
      <legend className={legendClassNames}>Describe your secondary paragliding equipment</legend>

      <FormField
        id="paraglider2Manufacturer"
        label="Manufacturer"
        register={form.register}
        errors={form.formState.errors}
        helpText="Enter the manufacturer of your secondary paraglider."
      />

      <FormField
        id="paraglider2Model"
        label="Model"
        register={form.register}
        errors={form.formState.errors}
        helpText="Enter the model of your secondary paraglider."
      />

      <FormField
        id="paraglider2PrimaryColor"
        label="Primary Colour"
        register={form.register}
        errors={form.formState.errors}
        helpText="Enter the primary color of your secondary paraglider."
      />

      <FormField
        id="paraglider2SecondaryColor"
        label="Secondary Colour"
        register={form.register}
        errors={form.formState.errors}
        helpText="Enter the secondary color of your secondary paraglider."
      />
    </fieldset>
  )
}
