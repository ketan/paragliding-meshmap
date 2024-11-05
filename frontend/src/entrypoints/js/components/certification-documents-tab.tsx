import { CertificationDocumentsEntity } from '../../../db-entities'
import { useEffect, useState } from 'react'
import { CertificationDetailsForm } from './certification-details-form.tsx'
import { CertificationDocumentsTable } from './certification-documents-table.tsx'

async function fetchCertificationDocuments() {
  const response = await fetch('/api/certification-documents', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    return
  }

  return (await response.json()) as CertificationDocumentsEntity[]
}

export function CertificationDocumentsTab() {
  const [showAddCertificationForm, setShowAddCertificationForm] = useState<boolean>(false)
  const [certificationDocuments, setCertificationDocuments] = useState<CertificationDocumentsEntity[]>()

  useEffect(() => {
    async function fetchData() {
      const certificationDocs = await fetchCertificationDocuments()
      if (certificationDocs) {
        setCertificationDocuments(certificationDocs)
      }
    }

    fetchData()
  }, [showAddCertificationForm])

  if (!certificationDocuments || certificationDocuments.length === 0 || showAddCertificationForm) {
    return <CertificationDetailsForm setShowAddCertificationForm={setShowAddCertificationForm} />
  } else {
    return (
      <CertificationDocumentsTable
        certificationDocuments={certificationDocuments}
        showAddCertificationForm={() => setShowAddCertificationForm(true)}
      />
    )
  }
}
