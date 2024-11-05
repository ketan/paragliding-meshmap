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

chai.use(chaiExclude)
chai.use(chaiDeepEqualIgnoreUndefined)

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
  return agent.post(url).set('x-csrf-token', token).send(data)
}

export async function put(agent: TestAgent<Test>, url: string, data?: string | object) {
  const token = await fetchCSRFToken(agent)
  return agent.put(url).set('x-csrf-token', token).send(data)
}

export async function createAdminUser() {
  const user = new User({
    displayName: 'ADmin User',
    email: 'admin@example.com',
    profilePhotoUrl: 'https://example.com/admin-user-profile-pic',
    admin: true,
  })
  await AppDataSource.getRepository(User).save(user)

  return await AppDataSource.getRepository(User).findOneByOrFail({ id: user.id })
}

export async function createRegularUser() {
  const user = await AppDataSource.getRepository(User).save(
    new User({
      displayName: 'Test User',
      email: 'test-user@example.com',
      profilePhotoUrl: 'https://example.com/test-user-profile-pic',
      admin: false,
    })
  )
  return await AppDataSource.getRepository(User).findOneByOrFail({ id: user.id })
}

export async function loginAs(agent: TestAgent<Test>, user: User) {
  const response = await post(agent, '/auth/test-login', { email: user.email, password: 'dont-matter' })
  expect(response.status).to.eq(302)
  expect(response.header['location']).to.eq('/')
}
