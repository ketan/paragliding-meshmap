import { Modal } from './modal.tsx'
import { Tabs } from './tabs.tsx'
import { InsuranceDocumentsTab } from './insurance-documents-tab.tsx'
import { CertificationDocumentsTab } from './certification-documents-tab.tsx'
import { IdentityDocumentsTab } from './identity-documents-tab.tsx'

export interface ProfileModalProps {
  show: boolean
  onClose: () => void
}

export function DocumentsModal({ show, onClose }: ProfileModalProps) {
  return (
    <Modal isOpen={show} onClose={onClose} header={'Documents'}>
      <div className="bg-white w-full text-gray-700">
        <Tabs tabs={['Identity', 'Certification', 'Insurance']}>
          <IdentityDocumentsTab />
          <CertificationDocumentsTab />
          <InsuranceDocumentsTab />
        </Tabs>
      </div>
    </Modal>
  )
}
