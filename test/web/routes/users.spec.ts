import request from 'supertest'
import { AppDataSource } from '#config/data-source'
import { User } from '#entity/user'
import { app } from '#web/app'
import { beforeEach } from 'mocha'
import { expect } from 'chai'
import { post, put } from '../../hooks.js'

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
})
