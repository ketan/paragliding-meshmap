import request from 'supertest'
import { AppDataSource } from '#config/data-source'
import { User } from '#entity/user'
import { app } from '#web/app'
import { beforeEach } from 'mocha'
import { expect } from 'chai'
import { createAdminUser, createRegularUser, loginAs, post, put } from '../../hooks.js'

describe('Users API', () => {
  describe('PUT /api/profile', () => {
    let originalUser: User
    const userAttributes: Partial<User> = {
      displayName: 'Bob The Builder',
      email: 'bob@example.com',
      profilePhotoUrl: 'https://example.com/bob-profile-pic',
    }

    beforeEach(async () => {
      originalUser = new User(userAttributes)
      await AppDataSource.getRepository(User).save(originalUser)
      originalUser = await AppDataSource.getRepository(User).findOneByOrFail({ id: originalUser.id })
    })

    afterEach(async () => {
      await AppDataSource.getRepository(User).delete({ id: originalUser.id })
    })

    it('should not update the user profile if no user is logged in', async () => {
      const updateData = {
        displayName: 'Thomas the train',
        email: 'this-should-not-update@example.com',
        profilePhotoUrl: 'https://this-should-not-be-updated',
      }

      const agent = request.agent(app)

      const response = await put(agent, '/api/profile', updateData)

      expect(response.status).to.eq(401)
      expect(response.body.error).to.eq('You are not logged in!')
      const loadedUser = await AppDataSource.getRepository(User).findOneByOrFail({ id: originalUser.id })
      expect(loadedUser).to.deepEqualIgnoreUndefined(originalUser)
    })

    it('should update the user profile if a user is logged in', async () => {
      const updateData = {
        displayName: 'Thomas the train',
        email: 'this-should-not-update@example.com',
        profilePhotoUrl: 'https://this-should-not-be-updated',
      }

      const agent = request.agent(app)

      const loginResponse = await post(agent, '/auth/test-login', {
        email: originalUser.email,
        password: 'dont-matter',
      })

      expect(loginResponse.status).to.eq(302)
      expect(loginResponse.header['location']).to.eq('/')

      const response = await put(agent, '/api/profile', updateData)

      expect(response.status).to.eq(200)
      const loadedUser = await AppDataSource.getRepository(User).findOneByOrFail({ id: originalUser.id })
      expect(response.body).to.deepEqualIgnoreUndefined(JSON.parse(JSON.stringify(loadedUser)))

      // only name is updated
      expect(loadedUser.displayName).to.eq(updateData.displayName)

      // other fields are not updated
      expect(loadedUser.email).to.not.eq(updateData.email)
      expect(loadedUser.profilePhotoUrl).to.not.eq(updateData.profilePhotoUrl)
    })

    it('should return 403 if user has no previous session', async () => {
      const updateData = {
        displayName: 'Thomas the train',
        email: 'this-should-not-update@example.com',
        profilePhotoUrl: 'https://this-should-not-be-updated',
      }

      const agent = request(app)

      const response = await put(agent, '/api/profile', updateData)

      expect(response.status).to.eq(403)
      expect(response.body.error).to.eq('CSRF validation error!')
      const loadedUser = await AppDataSource.getRepository(User).findOneByOrFail({ id: originalUser.id })
      expect(loadedUser).to.deepEqualIgnoreUndefined(originalUser)
    })

    it('should return 400 if submitted payload by a logged in user is invalid', async () => {
      const user = await createRegularUser()
      const agent = request.agent(app)
      await loginAs(agent, user)

      const response = await put(agent, '/api/profile', []) // send array instead of object
      expect(response.status).to.eq(400)
      expect(response.body.message).to.eq('Unable to parse submitted user data')
    })
  })

  describe('GET /api/profile', () => {
    it('should get logged in users profile', async () => {
      const user = await createRegularUser()
      const agent = request.agent(app)

      await loginAs(agent, user)

      const response = await agent.get('/api/profile')
      expect(response.status).to.eq(200)
      expect(response.body).to.deepEqualIgnoreUndefined(JSON.parse(JSON.stringify(user)))
    })

    it('should return 401 if user is not logged in', async () => {
      const agent = request(app)

      const response = await agent.get('/api/profile')
      expect(response.status).to.eq(401)
      expect(response.body.error).to.eq('You are not logged in!')
    })
  })

  describe('GET /api/user/:id', () => {
    it('should get user profile if user id is same as that of logged in user', async () => {
      const user = await createRegularUser({}, true)
      const agent = request.agent(app)

      await loginAs(agent, user)

      const response = await agent.get(`/api/user/${user.id}`)
      expect(response.status).to.eq(200)
      expect(response.body).to.deepEqualIgnoreUndefined(JSON.parse(JSON.stringify(user)))
    })

    it("super users should be able to get any user's profile", async () => {
      const user = await createRegularUser({}, true)
      const superUser = await createAdminUser()
      const agent = request.agent(app)

      await loginAs(agent, superUser)

      const response = await agent.get(`/api/user/${user.id}`)
      expect(response.status).to.eq(200)
      expect(response.body).to.deepEqualIgnoreUndefined(JSON.parse(JSON.stringify(user)))
    })

    it('location admins should be able to get profile of a user in their location', async () => {
      const user = await createRegularUser({ flightLocations: ['L1', 'L2'] }, true)
      const locationAdmin = await createRegularUser({ adminLocations: ['L1', 'L3'] })
      const agent = request.agent(app)

      await loginAs(agent, locationAdmin)

      const response = await agent.get(`/api/user/${user.id}`)
      expect(response.status).to.eq(200)
      expect(response.body).to.deepEqualIgnoreUndefined(JSON.parse(JSON.stringify(user)))
    })

    it('location admins should not be able to get profile of a user not in their location', async () => {
      const user = await createRegularUser({ flightLocations: ['L1', 'L2'] })
      const locationAdmin = await createRegularUser({ adminLocations: ['L3'] })
      const agent = request.agent(app)

      await loginAs(agent, locationAdmin)

      const response = await agent.get(`/api/user/${user.id}`)
      expect(response.status).to.eq(401)
      expect(response.body.error).to.eq('Not an admin')
    })

    it('should return 401 if user is not an admin and trying to get another user profile', async () => {
      const user = await createRegularUser()
      const anotherUser = await createRegularUser()
      const agent = request.agent(app)

      await loginAs(agent, user)

      const response = await agent.get(`/api/user/${anotherUser.id}`)
      expect(response.status).to.eq(401)
      expect(response.body.error).to.eq('Not an admin')
    })

    it('should return 404 if user is not found', async () => {
      const user = await createRegularUser()
      const agent = request.agent(app)

      await loginAs(agent, user)

      const response = await agent.get(`/api/user/12345`)
      expect(response.status).to.eq(404)
      expect(response.body.message).to.eq('User not found')
    })

    it('should return 401 if user is not logged in', async () => {
      const user = await createRegularUser()
      const agent = request(app)

      const response = await agent.get(`/api/user/${user.id}`)
      expect(response.status).to.eq(401)
      expect(response.body.error).to.eq('You are not logged in!')
    })
  })

  describe('GET /api/users', () => {
    it('should return 401 if user is not logged in', async () => {
      const agent = request(app)

      const response = await agent.get('/api/users')
      expect(response.status).to.eq(401)
      expect(response.body.error).to.eq('You are not logged in!')
    })

    it('should return 401 if user is not an admin', async () => {
      const user = await createRegularUser()
      const agent = request.agent(app)

      await loginAs(agent, user)

      const response = await agent.get('/api/users')
      expect(response.status).to.eq(401)
      expect(response.body.error).to.eq('Not an admin')
    })

    it('should return all users if user is an admin', async () => {
      const users = [await createRegularUser(), await createRegularUser()]
      const adminUser = await createAdminUser()
      const agent = request.agent(app)

      await loginAs(agent, adminUser)

      const response = await agent.get('/api/users')
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an('array')
      expect(response.body.length).to.eq(3)
      expect(response.body).to.deepEqualIgnoreUndefined(JSON.parse(JSON.stringify([adminUser, users[1], users[0]])))
    })

    it('should return all users in a given location if user is a location admin', async () => {
      const users = [
        await createRegularUser({ flightLocations: ['L1', 'L2'] }),
        await createRegularUser({ flightLocations: ['L5', 'L3'] }),
        await createRegularUser({ flightLocations: ['L4'] }),
      ]
      const locationAdmin = await createRegularUser({ adminLocations: ['L1', 'L4'] })
      const agent = request.agent(app)

      await loginAs(agent, locationAdmin)

      const response = await agent.get('/api/users')
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an('array')
      expect(response.body.length).to.eq(2)
      expect(response.body).to.deepEqualIgnoreUndefined(JSON.parse(JSON.stringify([users[2], users[0]])))
    })
  })
})
