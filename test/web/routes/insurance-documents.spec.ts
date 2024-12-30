import { expect } from 'chai'
import { app } from '#web/app'
import { User } from '#entity/user'
import supertest, { Test } from 'supertest'
import { createAdminUser, createRegularUser, fetchCSRFToken, loginAs, post } from '../../hooks.js'
import TestAgent from 'supertest/lib/agent.js'
import { InsurancePolicyDocument } from '#entity/insurance_policy_document'
import { AppDataSource } from '#config/data-source'
import { readFile } from 'fs/promises'
import { DateTime, Duration } from 'luxon'

describe('Insurance Documents API', () => {
  let agent: TestAgent<Test>
  let user: User

  beforeEach(async () => {
    agent = supertest.agent(app)
    user = await createRegularUser({ flightLocations: ['Location 1', 'Location 2'] })
  })

  async function createInsuranceDocument() {
    const document = new InsurancePolicyDocument({
      provider: 'ACME Insurance',
      policyNumber: '123456',
      user: user,
      document: Buffer.from('does-not-matter'),
      extension: 'pdf',
      contactPhone: '+1 1234 567 890',
      validityStart: DateTime.now()
        .minus(Duration.fromObject({ days: 7 }))
        .toJSDate(),
      validityEnd: DateTime.now()
        .plus(Duration.fromObject({ days: 365 - 7 }))
        .toJSDate(),
    })

    await AppDataSource.getRepository(InsurancePolicyDocument).save(document)
    return await AppDataSource.getRepository(InsurancePolicyDocument).findOneOrFail({
      where: { id: document.id },
    })
  }

  describe('GET /api/insurance-documents', () => {
    it('should return 401 if user is not authenticated', async () => {
      const response = await agent.get('/api/insurance-documents')
      expect(response.status).to.eq(401)
      expect(response.body.error).to.eq('User not authenticated')
    })

    it('should return insurance documents for authenticated user', async () => {
      await loginAs(agent, user)

      const document = await createInsuranceDocument()

      const response = await agent.get('/api/insurance-documents')
      expect(response.status).to.eq(200)
      expect(response.body).to.be.deep.eq([JSON.parse(JSON.stringify(document))])
    })
  })

  describe('GET /api/insurance-documents/:id', () => {
    it('should return 401 if user is not authenticated', async () => {
      const response = await agent.get('/api/insurance-documents/1')
      expect(response.status).to.eq(401)
      expect(response.body.error).to.eq('User not authenticated')
    })

    it('should return 404 if document is not found', async () => {
      await loginAs(agent, user)

      const response = await agent.get('/api/insurance-documents/999')
      expect(response.status).to.eq(404)
      expect(response.body.error).to.eq('Document not found')
    })

    it("should allow admin users to view any user's documents", async () => {
      const adminUser = await createAdminUser()
      await loginAs(agent, adminUser)

      const document = await createInsuranceDocument()

      const response = await agent.get(`/api/insurance-documents/${document.id}`)
      expect(response.status).to.eq(200)
      expect(response.header['content-type']).to.eq(document.getContentType())
      expect(response.body).to.deep.eq((await InsurancePolicyDocument.byId(AppDataSource, document.id))?.document)
    })

    it("should return 401 if non-admin user tries to view another user's document", async () => {
      const anotherUser = await createRegularUser()
      await loginAs(agent, anotherUser)

      const document = await createInsuranceDocument()

      const response = await agent.get(`/api/insurance-documents/${document.id}`)
      expect(response.status).to.eq(401)
      expect(response.body.error).to.eq('User not authenticated')
    })

    it('should allow location admin users to view documents of users in their location', async () => {
      const locationAdminUser = await createRegularUser({ adminLocations: [user.flightLocations[0]] })
      await loginAs(agent, locationAdminUser)

      const document = await createInsuranceDocument()

      const response = await agent.get(`/api/insurance-documents/${document.id}`)
      expect(response.status).to.eq(200)
      expect(response.header['content-type']).to.eq(document.getContentType())
      expect(response.body).to.deep.eq((await InsurancePolicyDocument.byId(AppDataSource, document.id))?.document)
    })

    it('should not allow location admin users to view documents of users not in their location', async () => {
      const locationAdminUser = await createRegularUser({ adminLocations: ['Location 3'] })
      await loginAs(agent, locationAdminUser)

      const document = await createInsuranceDocument()

      const response = await agent.get(`/api/insurance-documents/${document.id}`)
      expect(response.status).to.eq(401)
      expect(response.body.error).to.eq('User not authenticated')
    })
  })

  describe('POST /api/insurance-documents', () => {
    it('should return 401 if user is not authenticated', async () => {
      const response = await post(agent, '/api/insurance-documents')
      expect(response.status).to.eq(401)
      expect(response.body.error).to.eq('User not authenticated')
    })

    it('should create a new insurance document for authenticated user', async () => {
      await loginAs(agent, user)
      const csrfToken = await fetchCSRFToken(agent)
      expect(await AppDataSource.getRepository(InsurancePolicyDocument).count()).to.eq(0)
      const response = await agent
        .post('/api/insurance-documents')
        .set('x-csrf-token', csrfToken)
        .field({
          policyNumber: '11111',
          provider: 'ACME Insurance',
          contactPhone: '+1 1234 567 890',
          validityStart: DateTime.now()
            .minus(Duration.fromObject({ days: 7 }))
            .toISODate(),
          validityEnd: DateTime.now()
            .plus(Duration.fromObject({ days: 365 - 7 }))
            .toISODate(),
        })
        .attach('document', './test/assets/insurance.jpg')
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('id')

      expect(await AppDataSource.getRepository(InsurancePolicyDocument).count()).to.eq(1)
      const documentInDb = await InsurancePolicyDocument.findOne(AppDataSource, {
        select: ['id', 'document', 'extension', 'user'],
        where: {
          id: response.body.id,
          user: {
            id: user.id,
          },
        },
      })

      expect(documentInDb).to.exist
      expect(documentInDb?.extension).to.eq('jpg')
      expect(documentInDb?.document).to.deep.eq(await readFile('./test/assets/insurance.jpg'))
    })
  })
})
