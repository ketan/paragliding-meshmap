import { RootHookObject } from 'mocha'
import { AppDataSource, connString } from '#config/data-source'
import * as chai from 'chai'
import chaiDeepEqualIgnoreUndefined from 'chai-deep-equal-ignore-undefined'
import chaiExclude from 'chai-exclude'
import { createDatabase } from 'typeorm-extension'

chai.use(chaiExclude)
chai.use(chaiDeepEqualIgnoreUndefined)

export const mochaHooks: RootHookObject = {
  async beforeEach() {
    await createDatabase({ options: connString, initialDatabase: 'postgres' })

    await AppDataSource.initialize()
    await AppDataSource.runMigrations()
  },

  async afterEach() {
    await AppDataSource.dropDatabase()
    await AppDataSource.destroy()
  },
}
