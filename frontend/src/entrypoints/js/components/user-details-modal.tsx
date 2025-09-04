import { CertificationDocumentsEntity, IdentityDocumentsEntity, InsurancePolicyDocumentsEntity, UsersEntity } from '../../../db-entities'
import { useEffect, useState } from 'react'
import { Modal } from './modal.tsx'
import { PhoneLink } from './phone-link.tsx'
import { DateTime } from 'luxon'
import { InsuranceDocumentsTable } from './insurance-documents-table.tsx'
import { IconFileDownload } from '@tabler/icons-react'

interface ProfileModalProps {
  user: UsersEntity
  onClose: () => void
}

interface UserWithDocuments extends UsersEntity {
  identityDocuments: IdentityDocumentsEntity[]
  insurancePolicies: InsurancePolicyDocumentsEntity[]
  certificationDocuments: CertificationDocumentsEntity[]
}

export function UserDetailsModal({ user, onClose }: ProfileModalProps) {
  const [userDetails, setUserDetails] = useState<UserWithDocuments>()

  useEffect(() => {
    async function fetchUserProfile(userId: number) {
      try {
        const response = await fetch(`/api/user/${userId}`)
        const data = (await response.json()) as UserWithDocuments

        const sortByUpdatedAt = (a: { updatedAt: string }, b: { updatedAt: string }) =>
          DateTime.fromISO(b.updatedAt).toMillis() - DateTime.fromISO(a.updatedAt).toMillis()

        if (data.certificationDocuments) {
          data.certificationDocuments = data.certificationDocuments.sort(sortByUpdatedAt)
        }
        if (data.identityDocuments) {
          data.identityDocuments = data.identityDocuments.sort(sortByUpdatedAt)
        }
        if (data.insurancePolicies) {
          data.insurancePolicies = data.insurancePolicies.sort(sortByUpdatedAt)
        }

        setUserDetails(data)
      } catch (error) {
        console.error('Error fetching user profile:', error)
      }
    }

    if (user) {
      fetchUserProfile(user.id)
    }
  }, [user])

  const sectionHeader = 'lg:px-4 sm:px-1 pt-4 first:pt-2 pb-2'
  const listItemClass = 'lg:px-4 sm:px-2 sm:py-2 py-1 sm:grid sm:grid-cols-3 sm:gap-4 border-b border-b-gray-200'
  const listItemHeaderClass = 'text-xs sm:text-sm font-medium text-gray-900'
  const listItemValueClass = 'mt-1 text-xs sm:text-sm text-gray-700 sm:col-span-2 sm:mt-0'

  if (!userDetails) {
    return
  }

  return (
    <Modal isOpen={true} onClose={() => onClose()} header={`Personal details for ${userDetails.displayName}`}>
      <div className="bg-white w-full text-gray-700">
        <div className={sectionHeader}>
          <h3 className="text-base/7 font-semibold text-gray-900">Personal information</h3>
        </div>

        <dl>
          {userDetails.displayName && (
            <div className={listItemClass}>
              <dt className={listItemHeaderClass}>Display Name</dt>
              <dd className={listItemValueClass}>{userDetails.displayName}</dd>
            </div>
          )}
          {userDetails.email && (
            <div className={listItemClass}>
              <dt className={listItemHeaderClass}>Email</dt>
              <dd className={listItemValueClass}>{userDetails.email}</dd>
            </div>
          )}
          {userDetails.primaryPhone && (
            <div className={listItemClass}>
              <dt className={listItemHeaderClass}>Primary Phone</dt>
              <dd className={listItemValueClass}>
                <PhoneLink phoneNumber={userDetails.primaryPhone} whatsapp={true} telegram={true} />
              </dd>
            </div>
          )}
          {userDetails.secondaryPhone && (
            <div className={listItemClass}>
              <dt className={listItemHeaderClass}>Secondary Phone</dt>
              <dd className={listItemValueClass}>
                <PhoneLink phoneNumber={userDetails.secondaryPhone} whatsapp={true} telegram={true} />
              </dd>
            </div>
          )}
          {userDetails.dob && (
            <div className={listItemClass}>
              <dt className={listItemHeaderClass}>Date of Birth</dt>
              <dd className={listItemValueClass}>{DateTime.fromISO(userDetails.dob).toLocaleString(DateTime.DATE_FULL)}</dd>
            </div>
          )}
          {userDetails.nationality && (
            <div className={listItemClass}>
              <dt className={listItemHeaderClass}>Nationality</dt>
              <dd className={listItemValueClass}>{userDetails.nationality}</dd>
            </div>
          )}
          {userDetails.embassyPhone && (
            <div className={listItemClass}>
              <dt className={listItemHeaderClass}>Embassy Phone</dt>
              <dd className={listItemValueClass}>
                <PhoneLink phoneNumber={userDetails.embassyPhone} />
              </dd>
            </div>
          )}

          {userDetails.flightLocations && (
            <div className={listItemClass}>
              <dt className={listItemHeaderClass}>Flying Sites</dt>
              <dd className={listItemValueClass}>{userDetails.flightLocations.join(', ')}</dd>
            </div>
          )}

          {userDetails.identityDocuments && userDetails.identityDocuments.length > 0 && (
            <div className={listItemClass}>
              <dt className={listItemHeaderClass}>Identity Document(s)</dt>

              <dd className={listItemValueClass}>
                {userDetails.identityDocuments.map((doc, index) => (
                  <a href={`/api/identity-documents/${doc.id}`} key={index} target="_blank" rel="noreferrer">
                    <IconFileDownload className={'w-5 h-5 stroke-black'} />
                  </a>
                ))}
              </dd>
            </div>
          )}

          <div className={sectionHeader}>
            <h3 className="text-base/7 font-semibold text-gray-900">Primary Equipment</h3>
          </div>

          {userDetails.paraglider1Manufacturer && (
            <div className={listItemClass}>
              <dt className={listItemHeaderClass}>Manufacturer</dt>
              <dd className={listItemValueClass}>{userDetails.paraglider1Manufacturer}</dd>
            </div>
          )}
          {userDetails.paraglider1Model && (
            <div className={listItemClass}>
              <dt className={listItemHeaderClass}>Model</dt>
              <dd className={listItemValueClass}>{userDetails.paraglider1Model}</dd>
            </div>
          )}
          {userDetails.paraglider1PrimaryColor && (
            <div className={listItemClass}>
              <dt className={listItemHeaderClass}>Primary Color</dt>
              <dd className={listItemValueClass}>{userDetails.paraglider1PrimaryColor}</dd>
            </div>
          )}
          {userDetails.paraglider1SecondaryColor && (
            <div className={listItemClass}>
              <dt className={listItemHeaderClass}>Secondary Color</dt>
              <dd className={listItemValueClass}>{userDetails.paraglider1SecondaryColor}</dd>
            </div>
          )}

          {userDetails.paraglider2Manufacturer && (
            <div className={sectionHeader}>
              <h3 className="text-base/7 font-semibold text-gray-900">Secondary Equipment</h3>
            </div>
          )}

          {userDetails.paraglider2Manufacturer && (
            <div className={listItemClass}>
              <dt className={listItemHeaderClass}>Manufacturer</dt>
              <dd className={listItemValueClass}>{userDetails.paraglider2Manufacturer}</dd>
            </div>
          )}
          {userDetails.paraglider2Model && (
            <div className={listItemClass}>
              <dt className={listItemHeaderClass}>Model</dt>
              <dd className={listItemValueClass}>{userDetails.paraglider2Model}</dd>
            </div>
          )}
          {userDetails.paraglider2PrimaryColor && (
            <div className={listItemClass}>
              <dt className={listItemHeaderClass}>Primary Color</dt>
              <dd className={listItemValueClass}>{userDetails.paraglider2PrimaryColor}</dd>
            </div>
          )}
          {userDetails.paraglider2SecondaryColor && (
            <div className={listItemClass}>
              <dt className={listItemHeaderClass}>Secondary Color</dt>
              <dd className={listItemValueClass}>{userDetails.paraglider2SecondaryColor}</dd>
            </div>
          )}

          <div className={sectionHeader}>
            <h3 className="text-base/7 font-semibold text-gray-900">Address</h3>
          </div>

          {userDetails.address1 && (
            <div className={listItemClass}>
              <dt className={listItemHeaderClass}>Address 1</dt>
              <dd className={listItemValueClass}>{userDetails.address1}</dd>
            </div>
          )}
          {userDetails.address2 && (
            <div className={listItemClass}>
              <dt className={listItemHeaderClass}>Address 2</dt>
              <dd className={listItemValueClass}>{userDetails.address2}</dd>
            </div>
          )}
          {userDetails.city && (
            <div className={listItemClass}>
              <dt className={listItemHeaderClass}>City</dt>
              <dd className={listItemValueClass}>{userDetails.city}</dd>
            </div>
          )}
          {userDetails.state && (
            <div className={listItemClass}>
              <dt className={listItemHeaderClass}>State</dt>
              <dd className={listItemValueClass}>{userDetails.state}</dd>
            </div>
          )}
          {userDetails.postalCode && (
            <div className={listItemClass}>
              <dt className={listItemHeaderClass}>Postal Code</dt>
              <dd className={listItemValueClass}>{userDetails.postalCode}</dd>
            </div>
          )}
          {userDetails.country && (
            <div className={listItemClass}>
              <dt className={listItemHeaderClass}>Country</dt>
              <dd className={listItemValueClass}>{userDetails.country}</dd>
            </div>
          )}

          <div className={sectionHeader}>
            <h3 className="text-base/7 font-semibold text-gray-900">Emergency Contact(s)</h3>
          </div>

          {(userDetails.primaryEmergencyContactName || userDetails.primaryEmergencyContactPhone) && (
            <div className={listItemClass}>
              <dt className={listItemHeaderClass}>{userDetails.primaryEmergencyContactName}</dt>
              <dd className={listItemValueClass}>
                {userDetails.primaryEmergencyContactPhone && (
                  <PhoneLink phoneNumber={userDetails.primaryEmergencyContactPhone} whatsapp={true} telegram={true} />
                )}
              </dd>
            </div>
          )}

          {(userDetails.secondaryEmergencyContactName || userDetails.secondaryEmergencyContactPhone) && (
            <div className={listItemClass}>
              <dt className={listItemHeaderClass}>{userDetails.secondaryEmergencyContactName}</dt>
              <dd className={listItemValueClass}>
                {userDetails.secondaryEmergencyContactPhone && (
                  <PhoneLink phoneNumber={userDetails.secondaryEmergencyContactPhone} whatsapp={true} telegram={true} />
                )}
              </dd>
            </div>
          )}

          <div className={sectionHeader}>
            <h3 className="text-base/7 font-semibold text-gray-900">Insurance Policies</h3>
          </div>

          <InsuranceDocumentsTable
            showAddInsuranceForm={() => {}}
            insuranceDocuments={userDetails.insurancePolicies}
            allowUploads={false}
          />

          {(userDetails.medicalConditions || userDetails.medications || userDetails.allergies || userDetails.bloodGroup) && (
            <div className={sectionHeader}>
              <h3 className="text-base/7 font-semibold text-gray-900">Any medical information</h3>
            </div>
          )}

          {userDetails.medicalConditions && (
            <div className={listItemClass}>
              <dt className={listItemHeaderClass}>Medical Conditions</dt>
              <dd className={listItemValueClass}>{userDetails.medicalConditions}</dd>
            </div>
          )}
          {userDetails.medications && (
            <div className={listItemClass}>
              <dt className={listItemHeaderClass}>Medications</dt>
              <dd className={listItemValueClass}>{userDetails.medications}</dd>
            </div>
          )}
          {userDetails.allergies && (
            <div className={listItemClass}>
              <dt className={listItemHeaderClass}>Allergies</dt>
              <dd className={listItemValueClass}>{userDetails.allergies}</dd>
            </div>
          )}
          {userDetails.bloodGroup && (
            <div className={listItemClass}>
              <dt className={listItemHeaderClass}>Blood Group</dt>
              <dd className={listItemValueClass}>{userDetails.bloodGroup}</dd>
            </div>
          )}
        </dl>
      </div>
    </Modal>
  )
}
