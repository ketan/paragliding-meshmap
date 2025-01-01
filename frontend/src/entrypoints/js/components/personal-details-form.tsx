import { UseFormReturn } from 'react-hook-form'
import { countries, fieldsetClassNames, legendClassNames } from '../utils/form-helpers.tsx'
import { FormField } from './form-field.tsx'
import { CountryDropdown } from './country-dropdown.tsx'
import { Dropdown } from './dropdown.tsx'
import { useEffect, useState } from 'react'
import { fetchLocations } from '../utils/profile.ts'
import { ProfileFormValidation } from './profile-modal-interfaces.ts'

interface PersonalDetailsFormProps {
  form: UseFormReturn<ProfileFormValidation>
}

export function PersonalDetailsForm({ form }: PersonalDetailsFormProps) {
  const [locations, setLocations] = useState<string[]>()

  useEffect(() => {
    async function fetchLocationsIntoForm() {
      const locations = await fetchLocations()
      setLocations(locations)
    }

    fetchLocationsIntoForm()
  }, [setLocations])

  return (
    <fieldset className={fieldsetClassNames}>
      <legend className={legendClassNames}>Your personal details</legend>

      <FormField
        id="displayName"
        label="Name"
        register={form.register}
        errors={form.formState.errors}
        helpText="Please enter your full name."
      />

      <FormField
        id="email"
        type="email"
        label="Email address"
        register={form.register}
        errors={form.formState.errors}
        helpText="Your email address cannot be changed."
        disabled
      />

      <FormField
        id="primaryPhone"
        type="tel"
        label="Primary phone number"
        register={form.register}
        errors={form.formState.errors}
        helpText="Include your country code, e.g., +1 for USA."
      />

      <FormField
        id="secondaryPhone"
        type="tel"
        label="Secondary phone number"
        register={form.register}
        errors={form.formState.errors}
        helpText="Include your country code, e.g., +1 for USA."
      />

      <FormField
        id="dob"
        type="date"
        label="Date of Birth"
        register={form.register}
        errors={form.formState.errors}
        helpText="Please enter your date of birth."
      />

      <CountryDropdown
        id="nationality"
        type="select"
        label="Nationality"
        register={form.register}
        errors={form.formState.errors}
        helpText="Select your nationality from the list."
        countries={countries}
      />

      <FormField
        id="embassyPhone"
        type="tel"
        label="Embassy Phone Number"
        disabled={form.watch('nationality') === 'India'}
        register={form.register}
        errors={form.formState.errors}
        helpText="Non-Indians, please provide your embassy's phone number."
      />

      <Dropdown
        size={2}
        options={(locations || []).map((location) => ({ value: location, label: location }))}
        multiple={true}
        id="flightLocations"
        label="Sites where you fly, choose all that apply"
        register={form.register}
        errors={form.formState.errors}
        helpText="Select the locations where you fly. Your documents will be made availabe to administrators in these locations."
      />
    </fieldset>
  )
}
