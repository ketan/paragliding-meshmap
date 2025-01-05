import { yupResolver } from '@hookform/resolvers/yup'
import { profileFormDataYUPSchema, ProfileFormValidation } from './profile-modal-interfaces.ts'
import { useForm } from 'react-hook-form'
import { createOnSubmit, useFetchDataIntoForm } from '../utils/form-helpers.tsx'
import { fetchUserProfile } from '../utils/profile.ts'
import { PersonalDetailsForm } from './personal-details-form.tsx'
import { PrimaryParaglidingEquipmentForm } from './primary-paragliding-equipment.tsx'
import { SecondaryParaglidingEquipmentForm } from './secondary-paragliding-equipment-form.tsx'
import { AddressForm } from './address-form.tsx'
import { EmergencyContactForm } from './emergency-contact-form.tsx'
import { MedicalInformationForm } from './medical-information-form.tsx'
import { ActionBar } from './action-bar.tsx'
import { SubmitButton, SubmitButtonIcon } from './submit-button.tsx'
import { useState } from 'react'

async function submitData<T>(data: T): Promise<Response> {
  return await fetch('/api/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
}

export function ProfileFormTab() {
  const [submissionStatus, setSubmissionStatus] = useState<SubmitButtonIcon>()

  const resolver = yupResolver(profileFormDataYUPSchema)

  const form = useForm<ProfileFormValidation>({
    mode: 'onBlur',
    resolver: resolver,
    shouldUnregister: true,
  })

  useFetchDataIntoForm(form.setValue, fetchUserProfile)

  return (
    <form
      onSubmit={form.handleSubmit(
        createOnSubmit({
          submitHandler: submitData,
          submissionStatus: setSubmissionStatus,
        }),
        (e) => console.log(e)
      )}
    >
      <PersonalDetailsForm form={form} />
      <PrimaryParaglidingEquipmentForm form={form} />
      <SecondaryParaglidingEquipmentForm form={form} />
      <AddressForm form={form} />
      <EmergencyContactForm form={form} />
      <MedicalInformationForm form={form} />

      <ActionBar>
        <SubmitButton icon={submissionStatus}>Update profile</SubmitButton>
      </ActionBar>
    </form>
  )
}
