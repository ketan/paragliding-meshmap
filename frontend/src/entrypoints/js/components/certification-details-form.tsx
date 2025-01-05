import { CertificationFormData, certificationFormDataYUPSchema } from './profile-modal-interfaces.ts'
import { useForm } from 'react-hook-form'
import { createOnSubmit, fieldsetClassNames, legendClassNames, submitFormData } from '../utils/form-helpers.tsx'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormField } from './form-field.tsx'
import { ActionBar } from './action-bar.tsx'
import { SubmitButton, SubmitButtonIcon } from './submit-button.tsx'
import { useState } from 'react'

interface CertificationDetailsFormProps {
  setShowAddCertificationForm: (value: boolean) => void
}

export function CertificationDetailsForm({ setShowAddCertificationForm }: CertificationDetailsFormProps) {
  const [submissionStatus, setSubmissionStatus] = useState<SubmitButtonIcon>()

  const resolver = yupResolver(certificationFormDataYUPSchema)
  const form = useForm<CertificationFormData>({
    mode: 'onBlur',
    resolver: resolver,
    shouldUnregister: true,
  })

  const onSubmit = async function (evt: React.FormEvent<HTMLFormElement>) {
    await form.handleSubmit(
      createOnSubmit({
        submitHandler: (data) => submitFormData(data, '/api/certification-documents', 'POST'),
        submissionStatus: setSubmissionStatus,
      })
    )(evt)
    setShowAddCertificationForm(false)
  }

  return (
    <form onSubmit={onSubmit}>
      <fieldset className={fieldsetClassNames}>
        <legend className={legendClassNames}>Certification details</legend>
        <FormField
          id="issuingOrganization"
          label="Issuing organization"
          register={form.register}
          errors={form.formState.errors}
          helpText="Enter the name of the issuing organization."
        />
        <FormField
          id="certificateNumber"
          label="Certification number"
          register={form.register}
          errors={form.formState.errors}
          helpText="Enter the number of your certificate"
        />
        <FormField
          id="document"
          type="file"
          label="Upload Certification Document"
          register={form.register}
          errors={form.formState.errors}
          helpText="Upload a copy of your certification document."
        />
      </fieldset>
      <ActionBar>
        <SubmitButton icon={submissionStatus}>Upload</SubmitButton>
      </ActionBar>
    </form>
  )
}
