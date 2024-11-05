import { DeepRequired, FieldErrorsImpl, GlobalError, UseFormRegister } from 'react-hook-form'
import { ProfileFormDataWithoutProfileImage } from './profile-modal.tsx'
import { fieldsetClassNames, legendClassNames } from '../utils/form-helpers.tsx'
import { FormField } from './form-field.tsx'

interface PrimaryParaglidingEquipmentFormProps {
  register: UseFormRegister<ProfileFormDataWithoutProfileImage>

  errors: Partial<FieldErrorsImpl<DeepRequired<ProfileFormDataWithoutProfileImage>>> & {
    root?: Record<string, GlobalError> & GlobalError
  }
}

export function PrimaryParaglidingEquipmentForm({
  register,

  errors,
}: PrimaryParaglidingEquipmentFormProps) {
  return (
    <fieldset className={fieldsetClassNames}>
      <legend className={legendClassNames}>Describe your primary paragliding equipment</legend>

      <FormField
        id="paraglider1Manufacturer"
        label="Manufacturer"
        register={register}
        errors={errors}
        helpText="Enter the manufacturer of your primary paraglider."
      />

      <FormField
        id="paraglider1Model"
        label="Model"
        register={register}
        errors={errors}
        helpText="Enter the model of your primary paraglider."
      />

      <FormField
        id="paraglider1PrimaryColor"
        label="Primary Colour"
        register={register}
        errors={errors}
        helpText="Enter the primary color of your primary paraglider."
      />

      <FormField
        id="paraglider1SecondaryColor"
        label="Secondary Colour"
        register={register}
        errors={errors}
        helpText="Enter the secondary color of your primary paraglider."
      />
    </fieldset>
  )
}
