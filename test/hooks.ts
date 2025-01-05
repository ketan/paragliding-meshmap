import { RootHookObject } from 'mocha'
import { AppDataSource } from '#config/data-source'
import * as chai from 'chai'
import { expect } from 'chai'
import chaiDeepEqualIgnoreUndefined from 'chai-deep-equal-ignore-undefined'
import chaiExclude from 'chai-exclude'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { User } from '#entity/user'
import { app, doubleCsrfUtilities } from '#web/app'
import TestAgent from 'supertest/lib/agent.js'
import { Test } from 'supertest'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions.js'
import pg from 'pg'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiExclude)
chai.use(chaiDeepEqualIgnoreUndefined)
chai.use(chaiAsPromised)

const options: PostgresConnectionOptions = AppDataSource.options as PostgresConnectionOptions

export const mochaHooks: RootHookObject = {
  async beforeAll() {
    const pool = new pg.Pool({
      user: options.username,
      host: options.host,
      database: 'postgres',
      password: options.password,
      port: options.port,
    })

    await pool.query(`DROP DATABASE IF EXISTS "meshmap-template";`)
    await pool.query(`DROP DATABASE IF EXISTS "${options.database}";`)
    await pool.query(`CREATE DATABASE "${options.database}";`)

    await AppDataSource.initialize()
    await AppDataSource.runMigrations()
    await AppDataSource.destroy()

    await pool.query(`CREATE DATABASE "meshmap-template" TEMPLATE "${options.database}"`)
    await pool.end()

    passport.use(
      new LocalStrategy(
        {
          usernameField: 'email',
          session: true,
        },
        async function (email, _password, done) {
          try {
            const user = await User.findOne(AppDataSource, { where: { email: email } })
            if (user) {
              return done(null, user)
            } else {
              return done(null, false)
            }
          } catch (err) {
            return done(err)
          }
        }
      )
    )
    app.post(
      '/auth/test-login',
      doubleCsrfUtilities.doubleCsrfProtection,
      passport.authenticate('local', { failureRedirect: '/login' }),
      function (_req, res) {
        res.redirect('/')
      }
    )
  },

  async beforeEach() {
    const pool = new pg.Pool({
      user: options.username,
      host: options.host,
      database: 'postgres',
      password: options.password,
      port: options.port,
    })
    await pool.query(`DROP DATABASE IF EXISTS "${options.database}" WITH (FORCE);`)
    await pool.query(`CREATE DATABASE "${options.database}" TEMPLATE "meshmap-template";`)
    await pool.end()

    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize()
    }
  },
}

export async function fetchCSRFToken(agent: TestAgent<Test>) {
  const csrfResponse = await agent.get('/api/csrf-token')
  if (csrfResponse.status !== 200) {
    const csrfResponse2 = await agent.get('/api/csrf-token')
    expect(csrfResponse2.status, `Received bad response from csrf token ${JSON.stringify(csrfResponse.body)}`).to.equal(200)
    return csrfResponse2.body.token as string
  }
  return csrfResponse.body.token as string
}

export async function post(agent: TestAgent<Test>, url: string, data?: string | object) {
  const token = await fetchCSRFToken(agent)
  return agent.post(url).set('x-csrf-token', token).type('json').send(data)
}

export async function put(agent: TestAgent<Test>, url: string, data?: string | object) {
  const token = await fetchCSRFToken(agent)
  return agent.put(url).set('x-csrf-token', token).type('json').send(data)
}

export async function createAdminUser(props: Partial<User> = {}) {
  const randomPrefix = Math.random().toString(36).substring(2, 8)
  const user = new User({
    ...props,
    displayName: `Admin User ${randomPrefix}`,
    email: `admin-user-${randomPrefix}@example.com`,
    profilePhotoUrl: `https://example.com/admin-user-profile-pic-${randomPrefix}`,
    superUser: true,
  })
  await AppDataSource.getRepository(User).save(user)

  return await AppDataSource.getRepository(User).findOneByOrFail({ id: user.id })
}

export async function createRegularUser(props: Partial<User> = {}, loadReferences = false) {
  const randomPrefix = Math.random().toString(36).substring(2, 8)
  const user = await AppDataSource.getRepository(User).save(
    new User({
      ...props,
      displayName: `Test User ${randomPrefix}`,
      email: `test-user-${randomPrefix}@example.com`,
      profilePhotoUrl: `https://example.com/test-user-profile-pic-${randomPrefix}`,
      superUser: false,
    })
  )
  return await AppDataSource.getRepository(User).findOneOrFail({
    where: { id: user.id },
    relations: loadReferences ? ['identityDocuments', 'certificationDocuments', 'insurancePolicies'] : [],
  })
}

export async function loginAs(agent: TestAgent<Test>, user: User) {
  const response = await post(agent, '/auth/test-login', { email: user.email, password: 'dont-matter' })
  expect(response.status).to.eq(302)
  expect(response.header['location']).to.eq('/')
}
