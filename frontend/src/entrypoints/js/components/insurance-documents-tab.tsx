import { InsurancePolicyDocumentsEntity } from '../../../db-entities'
import { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { InsuranceFormData, insuranceFormDataYUPSchema } from './profile-modal-interfaces.ts'
import { useForm } from 'react-hook-form'
import { createOnSubmit } from '../utils/form-helpers.tsx'
import { InsuranceDetailsForm } from './insurance-details-form.tsx'
import { InsuranceDocumentsTable } from './insurance-documents-table.tsx'

async function fetchInsuranceDocuments() {
  const response = await fetch('/api/insurance-documents', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    return
  }

  return (await response.json()) as InsurancePolicyDocumentsEntity[]
}

export function InsuranceDocumentsTab() {
  const [showAddInsuranceForm, setShowAddInsuranceForm] = useState<boolean>(false)
  const [insuranceDocuments, setInsuranceDocuments] = useState<InsurancePolicyDocumentsEntity[]>()

  const resolver = yupResolver(insuranceFormDataYUPSchema)
  const {
    register,
    handleSubmit,
    formState: { errors: errors },
  } = useForm<InsuranceFormData>({
    mode: 'onBlur',
    resolver: resolver,
    shouldUnregister: true,
  })

  useEffect(() => {
    async function fetchData() {
      const insuranceDocs = await fetchInsuranceDocuments()
      if (insuranceDocs) {
        setInsuranceDocuments(insuranceDocs)
      }
    }

    fetchData()
  }, [showAddInsuranceForm])

  if (!insuranceDocuments || insuranceDocuments.length === 0 || showAddInsuranceForm) {
    const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
      await handleSubmit(createOnSubmit('/api/insurance-documents', 'POST'), (e) => console.log(e))(evt)
      setShowAddInsuranceForm(false)
    }

    return (
      <form onSubmit={onSubmit}>
        <InsuranceDetailsForm register={register} errors={errors} />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">
          Save
        </button>
      </form>
    )
  } else {
    return (
      <InsuranceDocumentsTable
        insuranceDocuments={insuranceDocuments}
        showAddInsuranceForm={() => setShowAddInsuranceForm(true)}
        allowUploads={true}
      />
    )
  }
}
