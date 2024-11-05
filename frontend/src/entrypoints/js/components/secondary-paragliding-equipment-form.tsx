import { DeepRequired, FieldErrorsImpl, GlobalError, UseFormRegister } from 'react-hook-form'
import { ProfileFormDataWithoutProfileImage } from './profile-modal.tsx'
import { fieldsetClassNames, legendClassNames } from '../utils/form-helpers.tsx'
import { FormField } from './form-field.tsx'

interface SecondaryParaglidingEquipmentFormProps {
  register: UseFormRegister<ProfileFormDataWithoutProfileImage>

  errors: Partial<FieldErrorsImpl<DeepRequired<ProfileFormDataWithoutProfileImage>>> & {
    root?: Record<string, GlobalError> & GlobalError
  }
}

export function SecondaryParaglidingEquipmentForm({ register, errors }: SecondaryParaglidingEquipmentFormProps) {
  return (
    <fieldset className={fieldsetClassNames}>
      <legend className={legendClassNames}>Describe your secondary paragliding equipment</legend>

      <FormField
        id="paraglider2Manufacturer"
        label="Manufacturer"
        register={register}
        errors={errors}
        helpText="Enter the manufacturer of your secondary paraglider."
      />

      <FormField
        id="paraglider2Model"
        label="Model"
        register={register}
        errors={errors}
        helpText="Enter the model of your secondary paraglider."
      />

      <FormField
        id="paraglider2PrimaryColor"
        label="Primary Colour"
        register={register}
        errors={errors}
        helpText="Enter the primary color of your secondary paraglider."
      />

      <FormField
        id="paraglider2SecondaryColor"
        label="Secondary Colour"
        register={register}
        errors={errors}
        helpText="Enter the secondary color of your secondary paraglider."
      />
    </fieldset>
  )
}
