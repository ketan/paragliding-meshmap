import request from 'supertest'
import { expect } from 'chai'
import { app } from '#web/app'
import { Location } from '#entity/location'
import { AppDataSource } from '#config/data-source'

const db = AppDataSource

describe('Locations API', () => {
  async function addLocations() {
    const locationRepository = db.getRepository(Location)

    const locations = [{ location: 'Location 1' }, { location: 'Location 2' }, { location: 'Location 3' }]

    for (const location of locations) {
      const newLocation = locationRepository.create(location)
      await locationRepository.save(newLocation)
    }
  }

  describe('GET /api/locations', () => {
    it('should return a list of locations', async () => {
      await db.getRepository(Location).clear()
      await addLocations()
      const response = await request(app).get('/api/locations')
      expect(response.status).to.equal(200)
      expect(response.body).to.be.an('array')
      expect(response.body.map((l: Location) => l.location)).to.have.members(['Location 3', 'Location 2', 'Location 1'])
    })
  })
})
