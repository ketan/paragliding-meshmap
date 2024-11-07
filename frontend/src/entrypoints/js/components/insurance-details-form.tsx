import { InsuranceFormData, insuranceFormDataYUPSchema } from './profile-modal-interfaces.ts'
import { useForm } from 'react-hook-form'
import { createOnSubmit, fieldsetClassNames, legendClassNames, submitFormData } from '../utils/form-helpers.tsx'
import { FormField } from './form-field.tsx'
import { ActionBar } from './action-bar.tsx'
import { SubmitButton, SubmitButtonIcon } from './submit-button.tsx'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormEvent, useState } from 'react'

interface InsuranceDetailsFormProps {
  setShowAddInsuranceForm: (value: boolean) => void
}

export function InsuranceDetailsForm({ setShowAddInsuranceForm }: InsuranceDetailsFormProps) {
  const [submissionStatus, setSubmissionStatus] = useState<SubmitButtonIcon>()

  const resolver = yupResolver(insuranceFormDataYUPSchema)
  const form = useForm<InsuranceFormData>({
    mode: 'onBlur',
    resolver: resolver,
    shouldUnregister: true,
  })

  const onSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    await form.handleSubmit(
      createOnSubmit({
        submitHandler: (data) => submitFormData(data, '/api/insurance-documents', 'POST'),
        submissionStatus: setSubmissionStatus,
      })
    )(evt)

    setShowAddInsuranceForm(false)
  }

  return (
    <form onSubmit={onSubmit}>
      <fieldset className={fieldsetClassNames}>
        <legend className={legendClassNames}>Insurance details</legend>
        <FormField
          id="provider"
          label="Insurance Provider Name"
          register={form.register}
          errors={form.formState.errors}
          helpText="Enter the name of your insurance provider."
        />
        <FormField
          id="policyNumber"
          label="Insurance Policy Number"
          register={form.register}
          errors={form.formState.errors}
          helpText="Enter your insurance policy number."
        />
        <FormField
          id="validityStart"
          type="date"
          label="Insurance Policy Start Date"
          register={form.register}
          errors={form.formState.errors}
          helpText="Enter the start date of your insurance policy."
        />
        <FormField
          id="validityEnd"
          type="date"
          label="Insurance Policy End Date"
          register={form.register}
          errors={form.formState.errors}
          helpText="Enter the end date of your insurance policy."
        />
        <FormField
          id="contactPhone"
          type="tel"
          label="Insurance Contact Phone Number"
          register={form.register}
          errors={form.formState.errors}
          helpText="Enter the contact phone number for your insurance provider."
        />
        <FormField
          id="document"
          type="file"
          label="Upload Insurance Policy Copy"
          register={form.register}
          errors={form.formState.errors}
          helpText="Upload a copy of your insurance policy."
        />
      </fieldset>
      <ActionBar>
        <SubmitButton icon={submissionStatus}>Save</SubmitButton>
      </ActionBar>
    </form>
  )
}
