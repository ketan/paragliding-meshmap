import request from 'supertest'
import { createDeviceProfile } from '#helpers/create-device-profile'
import { meshtastic } from '../../src/gen/meshtastic-protobufs.js'
import { expect } from 'chai'
import { app } from '../../src/web/app.js'

describe('GET /api/device-config', () => {
  it('should return 400 if shortName is blank', async () => {
    const response = await request(app).get('/api/device-config').query({ shortName: '', longName: 'ValidName' })
    expect(response.status).to.eq(400)
    expect(response.body.messages).to.deep.eq(['Short name must be between 2 and 4 characters'])
  })

  it('should return 400 if longName is blank', async () => {
    const response = await request(app).get('/api/device-config').query({ shortName: 'Bob', longName: '' })
    expect(response.status).to.eq(400)
    expect(response.body.messages).to.deep.eq(['Long name must be between 5 and 12 characters'])
  })

  it('should return 400 if both shortName and longName are blank', async () => {
    const response = await request(app).get('/api/device-config').query({ shortName: '', longName: '' })
    expect(response.status).to.eq(400)
    expect(response.body.messages).to.deep.eq([
      'Short name must be between 2 and 4 characters',
      'Long name must be between 5 and 12 characters',
    ])
  })

  it('should return 400 if shortName is shorter than 2 chars', async () => {
    const response = await request(app).get('/api/device-config').query({ shortName: '1', longName: 'ValidName' })
    expect(response.status).to.eq(400)
    expect(response.body.messages).to.deep.eq(['Short name must be between 2 and 4 characters'])
  })

  it('should return 400 if longName is shorter than 5 chars', async () => {
    const response = await request(app).get('/api/device-config').query({ shortName: 'Bob', longName: 'A' })
    expect(response.status).to.eq(400)
    expect(response.body.messages).to.deep.eq(['Long name must be between 5 and 12 characters'])
  })

  it('should return 400 if shortName is too long', async () => {
    const response = await request(app).get('/api/device-config').query({ shortName: 'TooLong', longName: 'ValidName' })
    expect(response.status).to.eq(400)
    expect(response.body.messages).to.deep.eq(['Short name must be between 2 and 4 characters'])
  })

  it('should return 400 if longName is too long', async () => {
    const response = await request(app).get('/api/device-config').query({
      shortName: 'Bob',
      longName: 'A Very Very Long Name',
    })
    expect(response.status).to.eq(400)
    expect(response.body.messages).to.deep.eq(['Long name must be between 5 and 12 characters'])
  })

  it('should return 200 and a device profile if shortName is 2 chars and longName is 5 chars', async () => {
    const shortName = 'AB'
    const longName = 'Valid'
    const response = await request(app).get('/api/device-config').query({ shortName, longName })
    expect(response.status).to.eq(200)
    expect(response.header['content-disposition']).to.contain(`${shortName.toLowerCase()}.cfg`)
    const decodedProfile = meshtastic.DeviceProfile.decode(response.body)
    expect(decodedProfile).to.deep.eq(createDeviceProfile(shortName, longName))
  })

  it('should return 200 and a device profile if inputs are valid', async () => {
    const shortName = 'Test'
    const longName = 'ValidName'
    const response = await request(app).get('/api/device-config').query({ shortName, longName })
    expect(response.status).to.eq(200)
    expect(response.header['content-disposition']).to.contain(`${shortName.toLowerCase()}.cfg`)
    const decodedProfile = meshtastic.DeviceProfile.decode(response.body)
    expect(decodedProfile).to.deep.eq(createDeviceProfile(shortName, longName))
  })

  it('should return 200 and a device profile if shortName is 4 chars and longName is 12 chars', async () => {
    const shortName = 'ABCD'
    const longName = '012345678912'
    const response = await request(app).get('/api/device-config').query({ shortName, longName })
    expect(response.status).to.eq(200)
    expect(response.header['content-disposition']).to.contain(`${shortName.toLowerCase()}.cfg`)
    const decodedProfile = meshtastic.DeviceProfile.decode(response.body)
    expect(decodedProfile).to.deep.eq(createDeviceProfile(shortName, longName))
  })
})
