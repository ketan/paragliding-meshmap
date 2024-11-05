import { InsuranceFormData } from './profile-modal-interfaces.ts'
import { DeepRequired, FieldErrorsImpl, GlobalError, UseFormRegister } from 'react-hook-form'
import { fieldsetClassNames, legendClassNames } from '../utils/form-helpers.tsx'
import { FormField } from './form-field.tsx'

interface InsuranceDetailsFormProps {
  register: UseFormRegister<InsuranceFormData>

  errors: Partial<FieldErrorsImpl<DeepRequired<InsuranceFormData>>> & {
    root?: Record<string, GlobalError> & GlobalError
  }
}

export function InsuranceDetailsForm({ register, errors }: InsuranceDetailsFormProps) {
  return (
    <fieldset className={fieldsetClassNames}>
      <legend className={legendClassNames}>Insurance details</legend>
      <FormField
        id="provider"
        label="Insurance Provider Name"
        register={register}
        errors={errors}
        helpText="Enter the name of your insurance provider."
      />
      <FormField
        id="policyNumber"
        label="Insurance Policy Number"
        register={register}
        errors={errors}
        helpText="Enter your insurance policy number."
      />
      <FormField
        id="validityStart"
        type="date"
        label="Insurance Policy Start Date"
        register={register}
        errors={errors}
        helpText="Enter the start date of your insurance policy."
      />
      <FormField
        id="validityEnd"
        type="date"
        label="Insurance Policy End Date"
        register={register}
        errors={errors}
        helpText="Enter the end date of your insurance policy."
      />
      <FormField
        id="contactPhone"
        type="tel"
        label="Insurance Contact Phone Number"
        register={register}
        errors={errors}
        helpText="Enter the contact phone number for your insurance provider."
      />
      <FormField
        id="document"
        type="file"
        label="Upload Insurance Policy Copy"
        register={register}
        errors={errors}
        helpText="Upload a copy of your insurance policy."
      />
    </fieldset>
  )
}
