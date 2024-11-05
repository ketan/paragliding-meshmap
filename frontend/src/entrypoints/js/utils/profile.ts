import { ProfileFormData } from '../components/profile-modal-interfaces.ts'

export type UserProfile = Omit<ProfileFormData, 'createdAt' | 'updatedAt' | 'id'>

export async function fetchUserProfile() {
  const response = await fetch('/api/profile', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    return
  }

  return (await response.json()) as ProfileFormData
}
