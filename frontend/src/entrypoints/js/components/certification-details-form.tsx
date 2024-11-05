import { CertificationFormData, certificationFormDataYUPSchema } from './profile-modal-interfaces.ts'
import { useForm } from 'react-hook-form'
import { createOnSubmit, fieldsetClassNames, legendClassNames } from '../utils/form-helpers.tsx'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormField } from './form-field.tsx'

interface CertificationDetailsFormProps {
  setShowAddCertificationForm: (value: boolean) => void
}

export function CertificationDetailsForm({ setShowAddCertificationForm }: CertificationDetailsFormProps) {
  const resolver = yupResolver(certificationFormDataYUPSchema)
  const {
    register,
    handleSubmit,
    formState: { errors: errors },
  } = useForm<CertificationFormData>({
    mode: 'onBlur',
    resolver: resolver,
    shouldUnregister: true,
  })

  const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    await handleSubmit(createOnSubmit('/api/certification-documents', 'POST'), (e) => console.log(e))(evt)
    setShowAddCertificationForm(false)
  }

  return (
    <form onSubmit={onSubmit}>
      <fieldset className={fieldsetClassNames}>
        <legend className={legendClassNames}>Certification details</legend>
        <FormField
          id="issuingOrganization"
          label="Issuing organization"
          register={register}
          errors={errors}
          helpText="Enter the name of the issuing organization."
        />
        <FormField
          id="certificateNumber"
          label="Certification number"
          register={register}
          errors={errors}
          helpText="Enter the number of your certificate"
        />
        <FormField
          id="document"
          type="file"
          label="Upload Certification Document"
          register={register}
          errors={errors}
          helpText="Upload a copy of your certification document."
        />
      </fieldset>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">
        Save
      </button>
    </form>
  )
}
