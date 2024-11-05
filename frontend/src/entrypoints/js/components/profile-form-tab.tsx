import countryList from 'country-list'
import { yupResolver } from '@hookform/resolvers/yup'
import { profileFormDataYUPSchema } from './profile-modal-interfaces.ts'
import { useForm } from 'react-hook-form'
import { useFetchDataIntoForm } from '../utils/form-helpers.tsx'
import { fetchUserProfile } from '../utils/profile.ts'
import { PersonalDetailsForm } from './personal-details-form.tsx'
import { PrimaryParaglidingEquipmentForm } from './primary-paragliding-equipment.tsx'
import { SecondaryParaglidingEquipmentForm } from './secondary-paragliding-equipment-form.tsx'
import { AddressForm } from './address-form.tsx'
import { EmergencyContactForm } from './emergency-contact-form.tsx'
import { MedicalInformationForm } from './medical-information-form.tsx'
import { ProfileFormDataWithoutProfileImage } from './profile-modal.tsx'

async function onSubmit<T extends object>(data: T) {
  try {
    const response = await fetch('/api/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const result = await response.json()

    return result
    console.log('Success:', result)
  } catch (error) {
    console.error('Error:', error)
  }
}

export function ProfileFormTab() {
  const countries = countryList.getData().sort((a, b) => a.name.localeCompare(b.name))

  const resolver = yupResolver(profileFormDataYUPSchema)
  const {
    register,
    handleSubmit,
    formState: { errors: errors },
    setValue,
  } = useForm<ProfileFormDataWithoutProfileImage>({
    mode: 'onBlur',
    resolver: resolver,
    shouldUnregister: true,
  })
  useFetchDataIntoForm(setValue, fetchUserProfile)

  return (
    <form onSubmit={handleSubmit(onSubmit, (e) => console.log(e))}>
      <>
        <PersonalDetailsForm register={register} errors={errors} countries={countries} />
        <PrimaryParaglidingEquipmentForm register={register} errors={errors} />
        <SecondaryParaglidingEquipmentForm register={register} errors={errors} />
        <AddressForm register={register} errors={errors} countries={countries} />
        <EmergencyContactForm register={register} errors={errors} />
        <MedicalInformationForm register={register} errors={errors} />
      </>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">
        Save
      </button>
    </form>
  )
}
