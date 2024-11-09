import request from 'supertest'
import { expect } from 'chai'
import { app } from '#web/app'

describe('App', () => {
  describe('Session and CSRF Middleware', () => {
    it('should return a CSRF token', async () => {
      const response = await request(app).get('/api/csrf-token')
      expect(response.status).to.equal(200)
      expect(response.headers['set-cookie']).to.satisfy((cookies: string[]) => cookies.some((cookie) => cookie.startsWith('x-csrf-token=')))
      expect(response.body).to.have.property('token')
    })

    it('should protect API routes with CSRF protection', async () => {
      const response = await request(app).post('/api/health-check')
      expect(response.status).to.equal(403)
      expect(response.body).to.have.property('error', 'CSRF validation error!')
    })
  })
})
