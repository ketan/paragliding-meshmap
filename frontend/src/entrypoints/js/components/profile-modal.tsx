import { Modal } from './modal.tsx'
import { AuthModalProps, ProfileFormData } from './profile-modal-interfaces.ts'
import { Tabs } from './tabs.tsx'
import { IdentityDocumentsTab } from './identity-documents-tab.tsx'
import { CertificationDocumentsTab } from './certification-documents-tab.tsx'
import { InsuranceDocumentsTab } from './insurance-documents-tab.tsx'
import { ProfileFormTab } from './profile-form-tab.tsx'

export type ProfileFormDataWithoutProfileImage = Omit<ProfileFormData, 'profilePhotoUrl'>

export function ProfileModal({ isOpen: show, onClose }: AuthModalProps) {
  if (!show) {
    return null
  }

  return (
    <Modal isOpen={show} onClose={onClose} header={'Profile'}>
      <div className="bg-white w-full text-gray-700">
        <Tabs tabs={['Info', 'Identity Documents', 'Certification Documents', 'Insurance Documents']}>
          <ProfileFormTab />
          <IdentityDocumentsTab />
          <CertificationDocumentsTab />
          <InsuranceDocumentsTab />
        </Tabs>
      </div>
    </Modal>
  )
}
