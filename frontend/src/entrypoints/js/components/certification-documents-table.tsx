import { CertificationDocumentsEntity } from '../../../db-entities'
import { IconFileDownload } from '@tabler/icons-react'

export function CertificationDocumentsTable({
  certificationDocuments,
  showAddCertificationForm,
}: {
  certificationDocuments?: CertificationDocumentsEntity[]
  showAddCertificationForm: () => void
}) {
  if (!certificationDocuments || certificationDocuments.length === 0) {
    return
  }

  const headerClass = 'p-2 text-start text-xs font-medium text-gray-500 uppercase'
  return (
    <div className="overflow-x-auto mt-4">
      <h3 className="text-sm font-bold mb-2">You have uploaded the following certification documents so far:</h3>
      <p className="text-sm">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            showAddCertificationForm()
          }}
        >
          Click here
        </a>{' '}
        to add a new certification document
      </p>
      <table className="min-w-full divide-y divide-gray-200 bg-gray-200">
        <thead>
          <tr>
            <th className={headerClass}>Issuing Organization</th>
            <th className={headerClass}>Certificate Number</th>
            <th className={headerClass}></th>
          </tr>
        </thead>
        <tbody>
          {certificationDocuments.map((doc, index) => {
            const classNames = `p-2 whitespace-nowrap text-xs sm:text-sm text-gray-800`
            return (
              <tr key={index} className={`odd:bg-white even:bg-gray-100 cursor-pointer`}>
                <td className={classNames}>{doc.issuingOrganization}</td>
                <td className={classNames}>{doc.certificateNumber}</td>
                <td>
                  <a href={`/api/certification-documents/${doc.id}`} target="_blank" rel="noreferrer">
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
