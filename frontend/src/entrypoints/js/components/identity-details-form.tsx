import { IdentityFormData, identityFormDataYUPSchema } from './profile-modal-interfaces.ts'
import { useForm } from 'react-hook-form'
import { createOnSubmit, fieldsetClassNames, legendClassNames } from '../utils/form-helpers.tsx'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormField } from './form-field.tsx'
import { FormEvent } from 'react'

interface IdentityDetailsFormProps {
  setShowAddIdentityForm: (value: boolean) => void
}

export function IdentityDetailsForm({ setShowAddIdentityForm }: IdentityDetailsFormProps) {
  const resolver = yupResolver(identityFormDataYUPSchema)
  const {
    register,
    handleSubmit,
    formState: { errors: errors },
  } = useForm<IdentityFormData>({
    mode: 'onBlur',
    resolver: resolver,
    shouldUnregister: true,
  })

  const onSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    await handleSubmit(createOnSubmit('/api/identity-documents', 'POST'), (e) => console.log(e))(evt)
    setShowAddIdentityForm(false)
  }

  return (
    <form onSubmit={onSubmit}>
      <fieldset className={fieldsetClassNames}>
        <legend className={legendClassNames}>Identity details</legend>
        <FormField
          id="document"
          type="file"
          label="Upload Identity Document"
          register={register}
          errors={errors}
          helpText="Upload a copy of your identity document."
        />
      </fieldset>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">
        Save
      </button>
    </form>
  )
}
