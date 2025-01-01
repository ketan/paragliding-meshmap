import { useEffect, useState } from 'react'
import { UsersEntity } from '../../../db-entities'
import { UserDetailsModal } from './user-details-modal.tsx'
import { Page } from './page.tsx'
import { setMapUrlParams } from '../utils/ui-util.tsx'

export function ProfileFormDataTable() {
  const [users, setUsers] = useState<UsersEntity[]>([])
  const [user, setUser] = useState<UsersEntity>()

  const [aboutModalVisible, setAboutModalVisible] = useState(false)
  const [profileModalVisible, setProfileModalVisible] = useState(false)
  const [configModalVisible, setConfigModalVisible] = useState(false)

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('/api/users')
        if (response.status === 200 || response.status === 304) {
          const data = await response.json()
          setUsers(data)
        }
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    fetchUsers()
  }, [])

  useEffect(() => {
    setMapUrlParams({ configure: configModalVisible })
  }, [configModalVisible])

  return (
    <Page
      aboutModal={{
        show: aboutModalVisible,
        onClick: () => {
          setAboutModalVisible(!aboutModalVisible)
        },
      }}
      profileModal={{
        show: profileModalVisible,
        onClick: () => {
          setProfileModalVisible(!profileModalVisible)
        },
      }}
      configModal={{
        show: configModalVisible,
        onClick: () => {
          setConfigModalVisible(!configModalVisible)
        },
      }}
    >
      <div className="flex flex-col bg-white">
        <div className="m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden shadow">
              <table className="min-w-full divide-y divide-gray-200 bg-gray-200">
                <thead>
                  <tr>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                      Display Name
                    </th>

                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                      Email
                    </th>

                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                      Primary Phone
                    </th>

                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                      Nationality
                    </th>

                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                      Primary Emergency Contact Name
                    </th>

                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                      Primary Emergency Contact Phone
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index} className="odd:bg-white even:bg-gray-100 cursor-pointer" onClick={() => setUser(user)}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{user.displayName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{user.primaryPhone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{user.nationality}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{user.primaryEmergencyContactName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{user.primaryEmergencyContactPhone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {user && <UserDetailsModal user={user} onClose={() => setUser(undefined)} />}
      </div>
    </Page>
  )
}
