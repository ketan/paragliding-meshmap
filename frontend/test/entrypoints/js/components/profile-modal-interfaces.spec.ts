import { expect } from 'chai'
import { profileFormDataYUPSchema } from '../../../../src/entrypoints/js/components/profile-modal-interfaces.js'

describe('profileFormDataYUPSchema', () => {
  it('should validate correct data', async () => {
    const validData = {
      displayName: 'John Doe',
      email: 'john.doe@example.com',
      primaryPhone: '+1 234 567-890',
      dob: '1990-01-01',
      nationality: 'US',
      identityDocument: new FileList(),
      paraglider1Manufacturer: 'Manufacturer1',
      paraglider1Model: 'Model1',
      paraglider1PrimaryColor: 'Red',
      address1: '123 Main St',
      city: 'Anytown',
      state: 'Anystate',
      postalCode: '12345',
      country: 'USA',
      primaryEmergencyContactName: 'Jane Doe',
      primaryEmergencyContactPhone: '+0987654321',
      insuranceProvider: 'Insurance Co',
      insurancePolicyNumber: '123456789',
      insuranceContactPhone: '+1122334455',
      insurancePolicyCopy: new FileList(),
    }

    expect(profileFormDataYUPSchema.isValid(validData)).to.be.true
  })

  it('should invalidate incorrect data', async () => {
    const invalidData = {
      displayName: '',
      email: 'invalid-email',
      primaryPhone: 'invalid-phone',
      dob: 'invalid-date',
      nationality: '',
      identityDocument: null,
      paraglider1Manufacturer: '',
      paraglider1Model: '',
      paraglider1PrimaryColor: '',
      address1: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      primaryEmergencyContactName: '',
      primaryEmergencyContactPhone: 'invalid-phone',
      insuranceProvider: '',
      insurancePolicyNumber: '',
      insuranceContactPhone: 'invalid-phone',
      insurancePolicyCopy: null,
    }

    expect(profileFormDataYUPSchema.isValid(invalidData)).to.be.false
  })
})
