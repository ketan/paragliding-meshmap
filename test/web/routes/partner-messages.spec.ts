import { expect } from 'chai'
import { app } from '#web/app'
import { User } from '#entity/user'
import supertest, { Test } from 'supertest'
import { createAdminUser, createRegularUser, fetchCSRFToken, loginAs } from '../../hooks.js'
import TestAgent from 'supertest/lib/agent.js'
import { PartnerMessage } from '#entity/partner_message'
import { AppDataSource, pgBoss } from '#config/data-source'
import sinon from 'sinon'

describe('Partner Messages API', () => {
  let agent: TestAgent<Test>
  let adminUser: User
  let regularUser: User
  let sendStub: sinon.SinonStub

  beforeEach(() => {
    sendStub = sinon.stub(pgBoss, 'send').resolves()
  })

  afterEach(() => {
    sendStub.restore()
  })

  beforeEach(async () => {
    agent = supertest.agent(app)
    adminUser = await createAdminUser()
    regularUser = await createRegularUser()
    await AppDataSource.getRepository(PartnerMessage).clear()
  })

  describe('GET /api/partner-messages', () => {
    it('should return 403 if user is not authenticated', async () => {
      const response = await agent.get('/api/partner-messages')
      expect(response.status).to.eq(403)
    })

    it('should return 403 if user is not superUser', async () => {
      await loginAs(agent, regularUser)
      const response = await agent.get('/api/partner-messages')
      expect(response.status).to.eq(403)
    })

    it('should return partner messages for superUser', async () => {
      await loginAs(agent, adminUser)
      const repo = AppDataSource.getRepository(PartnerMessage)
      await repo.save(
        repo.create({
          name: 'Test',
          email: 'test@example.com',
          subject: 'Hello',
          message: 'World',
        })
      )
      const response = await agent.get('/api/partner-messages')
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an('array')
      expect(response.body[0]).to.include({
        name: 'Test',
        email: 'test@example.com',
        subject: 'Hello',
        message: 'World',
      })
    })
  })

  describe('POST /api/partner-messages', () => {
    it('should require CSRF token', async () => {
      const response = await agent.post('/api/partner-messages').send({
        name: 'Test',
        email: 'test@example.com',
        subject: 'Hello',
        message: 'World',
      })
      expect(response.status).to.eq(403)
      expect(response.body.error).to.match(/csrf/i)
    })

    it('should create a partner message with valid CSRF', async () => {
      const csrfToken = await fetchCSRFToken(agent)
      const response = await agent.post('/api/partner-messages').set('x-csrf-token', csrfToken).send({
        name: 'Test',
        email: 'test@example.com',
        subject: 'Hello',
        message: 'World',
      })
      expect(response.status).to.eq(201)
      expect(response.body.success).to.eq(true)
      const messages = await AppDataSource.getRepository(PartnerMessage).find()
      expect(messages.length).to.eq(1)
      expect(messages[0]).to.include({
        name: 'Test',
        email: 'test@example.com',
        subject: 'Hello',
        message: 'World',
      })
    })

    it('should return 400 if any field is missing', async () => {
      const csrfToken = await fetchCSRFToken(agent)
      const response = await agent.post('/api/partner-messages').set('x-csrf-token', csrfToken).send({
        name: 'Test',
        email: '',
        subject: 'Hello',
        message: 'World',
      })
      expect(response.status).to.eq(400)
    })
  })
})
