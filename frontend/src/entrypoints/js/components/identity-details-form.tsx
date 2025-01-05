import { IdentityFormData, identityFormDataYUPSchema } from './profile-modal-interfaces.ts'
import { useForm } from 'react-hook-form'
import { createOnSubmit, fieldsetClassNames, legendClassNames, submitFormData } from '../utils/form-helpers.tsx'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormField } from './form-field.tsx'
import { FormEvent, useState } from 'react'
import { ActionBar } from './action-bar.tsx'
import { SubmitButton, SubmitButtonIcon } from './submit-button.tsx'

interface IdentityDetailsFormProps {
  setShowAddIdentityForm: (value: boolean) => void
  onReload: () => void
}

export function IdentityDetailsForm({ setShowAddIdentityForm, onReload }: IdentityDetailsFormProps) {
  const [submissionStatus, setSubmissionStatus] = useState<SubmitButtonIcon>()

  const resolver = yupResolver(identityFormDataYUPSchema)
  const form = useForm<IdentityFormData>({
    mode: 'onBlur',
    resolver: resolver,
    shouldUnregister: true,
  })

  const onSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    await form.handleSubmit(
      createOnSubmit({
        submitHandler: (data) => submitFormData(data, '/api/identity-documents', 'POST'),
        submissionStatus: setSubmissionStatus,
      })
    )(evt)
    setShowAddIdentityForm(false)
    onReload()
  }

  return (
    <form onSubmit={onSubmit}>
      <fieldset className={fieldsetClassNames}>
        <legend className={legendClassNames}>Identity details</legend>
        <FormField
          id="document"
          type="file"
          label="Upload Identity Document"
          register={form.register}
          errors={form.formState.errors}
          helpText="Upload a copy of your identity document."
        />
      </fieldset>
      <ActionBar>
        <SubmitButton icon={submissionStatus}>Upload</SubmitButton>
      </ActionBar>
    </form>
  )
}
