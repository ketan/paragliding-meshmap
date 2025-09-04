import { InsurancePolicyDocumentsEntity } from '../../../db-entities'
import { DateTime } from 'luxon'
import { PhoneLink } from './phone-link.tsx'
import { IconFileDownload } from '@tabler/icons-react'

export function InsuranceDocumentsTable({
  insuranceDocuments,
  showAddInsuranceForm,
  allowUploads,
}: {
  insuranceDocuments?: InsurancePolicyDocumentsEntity[]
  showAddInsuranceForm: () => void
  allowUploads: boolean
}) {
  if (!insuranceDocuments || insuranceDocuments.length === 0) {
    return
  }

  const isPolicyValid = (document: InsurancePolicyDocumentsEntity): boolean => {
    const startDate = DateTime.fromISO(document.validityStart)
    const endDate = DateTime.fromISO(document.validityEnd)
    const currentDate = DateTime.now()
    return startDate <= currentDate && currentDate <= endDate
  }

  const isPolicyInFuture = (document: InsurancePolicyDocumentsEntity): boolean => {
    const startDate = DateTime.fromISO(document.validityStart)
    const currentDate = DateTime.now()
    return startDate >= currentDate
  }

  const headerClass = 'p-2 text-start text-xs font-medium text-gray-500 uppercase'
  const showUpload = (
    <>
      <h3 className="text-sm font-bold mb-2">You have uploaded the following insurance documents so far:</h3>
      <p className="text-sm">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            showAddInsuranceForm()
          }}
        >
          Click here
        </a>{' '}
        to add a new insurance policy
      </p>
    </>
  )
  return (
    <div className="overflow-x-auto mt-4">
      {allowUploads && showUpload}
      <table className="min-w-full divide-y divide-gray-200 bg-gray-200">
        <thead>
          <tr>
            <th className={headerClass}>Status</th>
            <th className={headerClass}>Provider</th>
            <th className={headerClass}>Provider Phone</th>
            <th className={headerClass}>Policy Number</th>
            <th className={headerClass}>Validity Start</th>
            <th className={headerClass}>Validity Date</th>
            <th className={headerClass}></th>
          </tr>
        </thead>
        <tbody>
          {insuranceDocuments.map((doc, index) => {
            const policyValid = isPolicyValid(doc)
            const policyInFuture = isPolicyInFuture(doc)
            const classNames = `p-2 whitespace-nowrap text-xs sm:text-sm ${policyValid ? 'text-gray-800' : 'italic text-gray-500'}`
            return (
              <tr key={index} className={`odd:bg-white even:bg-gray-100 cursor-pointer`}>
                <td className={classNames}>{policyValid ? 'In Force' : policyInFuture ? 'Deferred' : 'Expired'}</td>
                <td className={classNames}>{doc.provider}</td>
                <td className={classNames}>
                  <PhoneLink phoneNumber={doc.contactPhone} />
                </td>
                <td className={classNames}>{doc.policyNumber}</td>
                <td className={classNames}>{DateTime.fromISO(doc.validityStart).toLocaleString(DateTime.DATE_MED)}</td>
                <td className={classNames}>{DateTime.fromISO(doc.validityEnd).toLocaleString(DateTime.DATE_MED)}</td>
                <td>
                  <a href={`/api/insurance-documents/${doc.id}`} target="_blank" rel="noreferrer">
                    <IconFileDownload className={'w-5 h-5 stroke-black'} />
                  </a>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
