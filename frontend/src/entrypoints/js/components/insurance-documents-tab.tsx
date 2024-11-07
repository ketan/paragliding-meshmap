import { InsurancePolicyDocumentsEntity } from '../../../db-entities'
import { useEffect, useState } from 'react'
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
    return <InsuranceDetailsForm setShowAddInsuranceForm={setShowAddInsuranceForm} />
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
