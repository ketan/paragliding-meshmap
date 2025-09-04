import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormField } from './form-field.tsx'

const inputsYupSchema = yup.object().shape({
  shortName: yup.string().required('Short name is required.').min(2, 'Minimum length is 2.').max(4, 'Maximum length is 4.'),
  longName: yup.string().required('Long name is required.').min(5, 'Minimum length is 5.').max(12, 'Maximum length is 12.'),
})

interface ConfigFormPageProps {
  formData?: FormInputs
  setFormData: (data: FormInputs) => void
  setFormValid: (valid: boolean) => void
}

export interface FormInputs {
  shortName: string
  longName: string
}

export function ConfigFormPage({ formData, setFormData, setFormValid }: ConfigFormPageProps) {
  const {
    register,
    formState: { errors, isValid },
    watch,
    subscribe,
  } = useForm<FormInputs>({
    mode: 'onBlur',
    shouldUnregister: true,
    resolver: yupResolver(inputsYupSchema),
    defaultValues: formData,
  })

  useEffect(() => {}, [])

  // Notify parent of validity changes
  useEffect(() => {
    setFormValid(isValid)
  }, [isValid, setFormValid])

  subscribe({
    callback: (data) => {
      setFormData(data.values)
    },
  })

  useEffect(() => {
    setFormData(watch())
  }, [watch, setFormData])

  return (
    <div className="text-sm md:text-md">
      <div className="block w-full sm:text-sm">
        <div className="rounded-md shadow-sm p-4">
          <div className="pl-2">
            <p className="font-semibold text-base text-center pb-4">Name your device</p>
            {/*<form onSubmit={handleSubmit()} className="space-y-2 p-2">*/}
            <FormField
              id="shortName"
              label="Short Name"
              type="text"
              register={register}
              errors={errors}
              helpText="Enter a unique 2-4 character identifier."
            />

            <FormField
              id="longName"
              label="Long Name"
              type="text"
              register={register}
              errors={errors}
              helpText="Enter a name 5-12 characters long."
            />
            {/*</form>*/}
          </div>
        </div>
      </div>
    </div>
  )
}
