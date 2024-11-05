import { expect } from 'chai'
import { app } from '#web/app'
import { User } from '#entity/user'
import supertest, { Test } from 'supertest'
import { createRegularUser, fetchCSRFToken, loginAs, post } from '../../hooks.js'
import TestAgent from 'supertest/lib/agent.js'
import { IdentityDocument } from '#entity/identity_document'
import { AppDataSource } from '#config/data-source'
import { readFile } from 'fs/promises'

describe('Identity Documents API', () => {
  let agent: TestAgent<Test>
  let user: User

  beforeEach(async () => {
    agent = supertest.agent(app)
    user = await createRegularUser()
  })

  async function createIdentityDocument() {
    const document = new IdentityDocument({
      user: user,
      document: Buffer.from('does-not-matter'),
      extension: 'pdf',
    })

    await AppDataSource.getRepository(IdentityDocument).save(document)
    return await AppDataSource.getRepository(IdentityDocument).findOneByOrFail({ id: document.id })
  }

  describe('GET /api/identity-documents', () => {
    it('should return 401 if user is not authenticated', async () => {
      const response = await agent.get('/api/identity-documents')
      expect(response.status).to.eq(401)
      expect(response.body.error).to.eq('User not authenticated')
    })

    it('should return identity documents for authenticated user', async () => {
      await loginAs(agent, user)

      const document = await createIdentityDocument()

      const response = await agent.get('/api/identity-documents')
      expect(response.status).to.eq(200)
      expect(response.body).to.be.deep.eq([JSON.parse(JSON.stringify(document))])
    })
  })

  describe('GET /api/identity-documents/:id', () => {
    it('should return 401 if user is not authenticated', async () => {
      const response = await agent.get('/api/identity-documents/1')
      expect(response.status).to.eq(401)
      expect(response.body.error).to.eq('User not authenticated')
    })

    it('should return 404 if document is not found', async () => {
      await loginAs(agent, user)

      const response = await agent.get('/api/identity-documents/999')
      expect(response.status).to.eq(404)
      expect(response.body.error).to.eq('Document not found')
    })
  })

  describe('POST /api/identity-documents', () => {
    it('should return 401 if user is not authenticated', async () => {
      const response = await post(agent, '/api/identity-documents')
      expect(response.status).to.eq(401)
      expect(response.body.error).to.eq('User not authenticated')
    })

    it('should create a new identity document for authenticated user', async () => {
      await loginAs(agent, user)
      const csrfToken = await fetchCSRFToken(agent)
      expect(await AppDataSource.getRepository(IdentityDocument).count()).to.eq(0)
      const response = await agent
        .post('/api/identity-documents')
        .set('x-csrf-token', csrfToken)
        .field({
          documentNumber: '11111',
          issuingOrganization: 'ACME Corp',
        })
        .attach('document', './test/assets/passport.jpg')
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('id')

      expect(await AppDataSource.getRepository(IdentityDocument).count()).to.eq(1)
      const documentInDb = await IdentityDocument.findOne(AppDataSource, {
        select: ['id', 'document', 'extension', 'user'],
        where: {
          id: response.body.id,
          user: user,
        },
      })

      expect(documentInDb).to.exist
      expect(documentInDb?.extension).to.eq('jpg')
      expect(documentInDb?.document).to.deep.eq(await readFile('./test/assets/passport.jpg'))
    })
  })
})
