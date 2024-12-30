import { LocationsEntity } from '../../../db-entities'
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

export async function fetchLocations() {
  const response = await fetch('/api/locations', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    return
  }

  const locations = (await response.json()) as LocationsEntity[]
  return locations.map((location) => {
    return location.location
  })
}
