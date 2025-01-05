import { IdentityDocumentsEntity } from '../../../db-entities'
import { useEffect, useState } from 'react'
import { IdentityDetailsForm } from './identity-details-form.tsx'
import { IdentityDocumentsTable } from './identity-documents-table.tsx'

async function fetchIdentityDocuments() {
  const response = await fetch('/api/identity-documents', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    return
  }

  return (await response.json()) as IdentityDocumentsEntity[]
}

export function IdentityDocumentsTab() {
  const [showAddIdentityForm, setShowAddIdentityForm] = useState<boolean>(false)
  const [reloadData, setReloadData] = useState<boolean>(true)
  const [identityDocuments, setIdentityDocuments] = useState<IdentityDocumentsEntity[]>()

  useEffect(() => {
    async function fetchData() {
      const identityDocs = await fetchIdentityDocuments()
      if (identityDocs) {
        setIdentityDocuments(identityDocs)
      }
    }

    if (reloadData) {
      fetchData()
      setReloadData(false)
    }
  }, [reloadData])

  if (!identityDocuments || identityDocuments.length === 0 || showAddIdentityForm) {
    return <IdentityDetailsForm setShowAddIdentityForm={setShowAddIdentityForm} onReload={() => setReloadData(true)} />
  } else {
    return <IdentityDocumentsTable identityDocuments={identityDocuments} showAddIdentityForm={() => setShowAddIdentityForm(true)} />
  }
}
