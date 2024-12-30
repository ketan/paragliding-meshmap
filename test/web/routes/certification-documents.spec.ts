import { expect } from 'chai'
import { app } from '#web/app'
import { User } from '#entity/user'
import supertest, { Test } from 'supertest'
import { createAdminUser, createRegularUser, fetchCSRFToken, loginAs, post } from '../../hooks.js'
import TestAgent from 'supertest/lib/agent.js'
import { CertificationDocument } from '#entity/certitication_document'
import { AppDataSource } from '#config/data-source'
import { readFile } from 'fs/promises'

describe('Certification Documents API', () => {
  let agent: TestAgent<Test>
  let user: User

  beforeEach(async () => {
    agent = supertest.agent(app)
    user = await createRegularUser({ flightLocations: ['Location 1', 'Location 2'] })
  })

  async function createCertificationDocument() {
    const document = new CertificationDocument({
      issuingOrganization: 'ACME Corp',
      certificateNumber: '123456',
      user: user,
      document: Buffer.from('does-not-matter'),
      extension: 'pdf',
    })

    await AppDataSource.getRepository(CertificationDocument).save(document)
    return await AppDataSource.getRepository(CertificationDocument).findOneByOrFail({ id: document.id })
  }

  describe('GET /api/certification-documents', () => {
    it('should return 401 if user is not authenticated', async () => {
      const response = await agent.get('/api/certification-documents')
      expect(response.status).to.eq(401)
      expect(response.body.error).to.eq('User not authenticated')
    })

    it('should return certification documents for authenticated user', async () => {
      await loginAs(agent, user)

      const document = await createCertificationDocument()

      const response = await agent.get('/api/certification-documents')
      expect(response.status).to.eq(200)
      expect(response.body).to.be.deep.eq([JSON.parse(JSON.stringify(document))])
    })
  })

  describe('GET /api/certification-documents/:id', () => {
    it('should return 401 if user is not authenticated', async () => {
      const response = await agent.get('/api/certification-documents/1')
      expect(response.status).to.eq(401)
      expect(response.body.error).to.eq('User not authenticated')
    })

    it('should return 404 if document is not found', async () => {
      await loginAs(agent, user)

      const response = await agent.get('/api/certification-documents/999')
      expect(response.status).to.eq(404)
      expect(response.body.error).to.eq('Document not found')
    })

    it("should allow admin users to view any user's documents", async () => {
      const adminUser = await createAdminUser()
      await loginAs(agent, adminUser)

      const document = await createCertificationDocument()

      const response = await agent.get(`/api/certification-documents/${document.id}`)
      expect(response.status).to.eq(200)
      expect(response.header['content-type']).to.eq(document.getContentType())
      expect(response.body).to.deep.eq((await CertificationDocument.byId(AppDataSource, document.id))?.document)
    })

    it("should return 401 if non-admin user tries to view another user's document", async () => {
      const anotherUser = await createRegularUser()
      await loginAs(agent, anotherUser)

      const document = await createCertificationDocument()

      const response = await agent.get(`/api/certification-documents/${document.id}`)
      expect(response.status).to.eq(401)
      expect(response.body.error).to.eq('User not authenticated')
    })

    it('should allow location admin users to view documents of users in their location', async () => {
      const locationAdminUser = await createRegularUser({ adminLocations: [user.flightLocations[0]] })
      await loginAs(agent, locationAdminUser)

      const document = await createCertificationDocument()

      const response = await agent.get(`/api/certification-documents/${document.id}`)
      expect(response.status).to.eq(200)
      expect(response.header['content-type']).to.eq(document.getContentType())
      expect(response.body).to.deep.eq((await CertificationDocument.byId(AppDataSource, document.id))?.document)
    })

    it('should not allow location admin users to view documents of users not in their location', async () => {
      const locationAdminUser = await createRegularUser({ adminLocations: ['Location 3'] })
      await loginAs(agent, locationAdminUser)

      const document = await createCertificationDocument()

      const response = await agent.get(`/api/certification-documents/${document.id}`)
      expect(response.status).to.eq(401)
      expect(response.body.error).to.eq('User not authenticated')
    })
  })

  describe('POST /api/certification-documents', () => {
    it('should return 401 if user is not authenticated', async () => {
      const response = await post(agent, '/api/certification-documents')
      expect(response.status).to.eq(401)
      expect(response.body.error).to.eq('User not authenticated')
    })

    it('should create a new certification document for authenticated user', async () => {
      await loginAs(agent, user)
      const csrfToken = await fetchCSRFToken(agent)
      expect(await AppDataSource.getRepository(CertificationDocument).count()).to.eq(0)
      const response = await agent
        .post('/api/certification-documents')
        .set('x-csrf-token', csrfToken)
        .field({
          certificateNumber: '11111',
          issuingOrganization: 'ACME Corp',
        })
        .attach('document', './test/assets/certificate.png')
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('id')

      expect(await AppDataSource.getRepository(CertificationDocument).count()).to.eq(1)
      const documentInDb = await CertificationDocument.findOne(AppDataSource, {
        select: ['id', 'document', 'extension', 'user'],
        where: {
          id: response.body.id,
          user: {
            id: user.id,
          },
        },
      })

      expect(documentInDb).to.exist
      expect(documentInDb?.extension).to.eq('png')
      expect(documentInDb?.document).to.deep.eq(await readFile('./test/assets/certificate.png'))
    })
  })
})
