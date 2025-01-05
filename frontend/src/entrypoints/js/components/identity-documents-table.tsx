import { IdentityDocumentsEntity } from '../../../db-entities'
import { FileArrowDownIcon } from '../utils/icon-constants.ts'
import { timeAgo } from '../utils/ui-util.tsx'

export function IdentityDocumentsTable({
  identityDocuments,
  showAddIdentityForm,
}: {
  identityDocuments?: IdentityDocumentsEntity[]
  showAddIdentityForm: () => void
}) {
  if (!identityDocuments || identityDocuments.length === 0) {
    return
  }

  const headerClass = 'p-2 text-start text-xs font-medium text-gray-500 uppercase'
  return (
    <div className="overflow-x-auto mt-4">
      <h3 className="text-sm font-bold mb-2">You have uploaded the following identity documents so far:</h3>
      <p className="text-sm">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            showAddIdentityForm()
          }}
        >
          Click here
        </a>{' '}
        to add a new identity document
      </p>
      <table className="min-w-full divide-y divide-gray-200 bg-gray-200">
        <thead>
          <tr>
            <th className={headerClass}>Upload Date</th>
            <th className={headerClass}></th>
          </tr>
        </thead>
        <tbody>
          {identityDocuments.map((doc, index) => {
            const classNames = `p-2 whitespace-nowrap text-xs sm:text-sm text-gray-800`
            return (
              <tr key={index} className={`odd:bg-white even:bg-gray-100 cursor-pointer`}>
                <td className={classNames}>{timeAgo(doc.createdAt)}</td>
                <td>
                  <a href={`/api/identity-documents/${doc.id}`} target="_blank" rel="noreferrer">
                    <FileArrowDownIcon className={'w-4 h-4'} />
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
