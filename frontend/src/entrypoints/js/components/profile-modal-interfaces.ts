import * as Yup from 'yup'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import React from 'react'

export interface InsuranceFormData {
  provider: string
  policyNumber: string
  contactPhone: string
  document: FileList
  validityStart: string
  validityEnd: string
}

export interface IdentityFormData {
  document: FileList
}

export interface CertificationFormData {
  issuingOrganization: string
  certificateNumber: string
  document: FileList
}

export interface ProfileFormData {
  // personal details
  displayName: string
  profilePhotoUrl: string
  email: string
  primaryPhone: string
  secondaryPhone?: string
  dob: string
  nationality: string
  embassyPhone?: string
  identityDocument: FileList

  // primary equipment
  paraglider1Manufacturer: string
  paraglider1Model: string
  paraglider1PrimaryColor: string
  paraglider1SecondaryColor?: string

  paraglider2Manufacturer?: string
  paraglider2Model?: string
  paraglider2PrimaryColor?: string
  paraglider2SecondaryColor?: string

  // address
  address1: string
  address2?: string
  city: string
  state: string
  postalCode: string
  country: string

  // emergency contacts
  primaryEmergencyContactName: string
  primaryEmergencyContactPhone: string
  secondaryEmergencyContactName?: string
  secondaryEmergencyContactPhone?: string

  // medical
  medicalConditions?: string
  medications?: string
  allergies?: string
  bloodGroup?: string
}

export interface AuthModalProps {
  show: boolean
  onClose: () => void
}

const mandatoryPhoneValidator = (value: string) => {
  const phoneNumber = parsePhoneNumberFromString(value || '')
  return phoneNumber?.isValid()
}

const optionalPhoneValidator = (value: string | undefined) => {
  if (!value || value.trim() === '') {
    return true
  }

  return mandatoryPhoneValidator(value)
}

const imageFileListValidator = (value: FileList) => {
  if (!value || value.length === 0) {
    return false
  }
  const fileType = value[0].type
  return ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg', 'image/tiff'].includes(fileType)
}

const fileSizeValidator = (value: FileList) => {
  if (!value || value.length === 0) {
    return false
  }
  const file = value[0]
  return file.size < 1024 * 1024 * 2
}

const filePresentValidator = (value: FileList) => {
  return value?.length === 1
}

export const profileFormDataYUPSchema = Yup.object().shape({
  // personal details
  displayName: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),

  primaryPhone: Yup.string()
    .required('Primary phone is required')
    .test('invalid-phone-number', 'Invalid phone number', (value): boolean | undefined => {
      const phoneNumber = parsePhoneNumberFromString(value)
      return phoneNumber?.isValid()
    }),
  secondaryPhone: Yup.string().optional().test('invalid-phone-number', 'Invalid phone number', optionalPhoneValidator),
  dob: Yup.string().required('Date of birth is required'),
  nationality: Yup.string().required('Nationality is required'),
  embassyPhone: Yup.string()
    .optional()
    .test('invalid-phone-number', 'Invalid phone number', (value, context) => {
      // Indians don't need to provide embassy number
      if (context.parent.nationality === 'IN') {
        return true
      }

      return optionalPhoneValidator(value)
    }),
  identityDocument: Yup.mixed<FileList>()
    .required('Identity document is required')
    .test('fileRequired', 'Identity document is required', filePresentValidator)
    .test('fileTooLarge', 'File must be under 2MB', fileSizeValidator)
    .test('fileType', 'Unsupported file format', imageFileListValidator),
  // primary equipment
  paraglider1Manufacturer: Yup.string().required('Manufacturer is required'),
  paraglider1Model: Yup.string().required('Model is required'),
  paraglider1PrimaryColor: Yup.string().required('Primary colour is required'),
  paraglider1SecondaryColor: Yup.string().optional(),

  paraglider2Manufacturer: Yup.string().optional(),
  paraglider2Model: Yup.string()
    .optional()
    .when('paraglider2Manufacturer', {
      is: (val: string) => !!val,
      then: (schema) => schema.required('Model is required'),
      otherwise: (schema) => schema.optional(),
    }),
  paraglider2PrimaryColor: Yup.string()
    .optional()
    .when('paraglider2Manufacturer', {
      is: (val: string) => !!val,
      then: (schema) => schema.required('Primary colour is required'),
      otherwise: (schema) => schema.optional(),
    }),
  paraglider2SecondaryColor: Yup.string().optional(),

  // address
  address1: Yup.string().required('Address 1 is required'),
  address2: Yup.string().optional(),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  postalCode: Yup.string().required('Postal code is required'),
  country: Yup.string().required('Country is required'),

  // emergency contact
  primaryEmergencyContactName: Yup.string().required('Primary emergency contact name is required'),
  primaryEmergencyContactPhone: Yup.string()
    .required('Primary emergency contact phone is required')
    .test('invalid-phone-number', 'Invalid phone number', mandatoryPhoneValidator),
  secondaryEmergencyContactName: Yup.string().optional(),
  secondaryEmergencyContactPhone: Yup.string()
    .optional()
    .when('secondaryEmergencyContactName', {
      is: (val: string) => !!val,
      then: (schema) => schema.required('Secondary emergency contact phone is required'),
      otherwise: (schema) => schema.optional(),
    }),
  // insurance

  // medical
  medicalConditions: Yup.string().optional(),
  medications: Yup.string().optional(),
  allergies: Yup.string().optional(),
  bloodGroup: Yup.string().optional(),
})

export const insuranceFormDataYUPSchema = Yup.object().shape({
  provider: Yup.string().required('Provider is required'),
  policyNumber: Yup.string().required('Policy number is required'),
  contactPhone: Yup.string()
    .required('Contact phone is required')
    .test('invalid-phone-number', 'Invalid phone number', mandatoryPhoneValidator),
  document: Yup.mixed<FileList>()
    .required('Policy copy is required')
    .test('fileRequired', 'Policy copy is required', filePresentValidator)
    .test('fileTooLarge', 'File must be under 2MB', fileSizeValidator)
    .test('fileType', 'Unsupported file format', imageFileListValidator),
  validityStart: Yup.string().required('Policy start date is required'),
  validityEnd: Yup.string().required('Policy end date is required'),
})

export const certificationFormDataYUPSchema = Yup.object().shape({
  issuingOrganization: Yup.string().required('Issuing organization is required'),
  certificateNumber: Yup.string().required('Certificate number is required'),
  document: Yup.mixed<FileList>()
    .required('Policy copy is required')
    .test('fileRequired', 'Policy copy is required', filePresentValidator)
    .test('fileTooLarge', 'File must be under 2MB', fileSizeValidator)
    .test('fileType', 'Unsupported file format', imageFileListValidator),
})

export const identityFormDataYUPSchema = Yup.object().shape({
  document: Yup.mixed<FileList>()
    .required('Identity document is required')
    .test('fileRequired', 'Identity document is required', filePresentValidator)
    .test('fileTooLarge', 'File must be under 2MB', fileSizeValidator)
    .test('fileType', 'Unsupported file format', imageFileListValidator),
})

export const phoneNumberFormatOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  const phoneNumber = parsePhoneNumberFromString(e.target.value || '')
  if (phoneNumber?.isValid()) {
    e.target.value = phoneNumber.formatInternational()
  }
}
