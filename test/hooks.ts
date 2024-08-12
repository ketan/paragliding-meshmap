import { RootHookObject } from 'mocha'
import { AppDataSource } from '#config/data-source'
import * as chai from 'chai'
import chaiDeepEqualIgnoreUndefined from 'chai-deep-equal-ignore-undefined'
import { ENTITY_TYPES } from '#helpers/entity-types'
import chaiExclude from 'chai-exclude'

chai.use(chaiExclude)
chai.use(chaiDeepEqualIgnoreUndefined)

export const mochaHooks: RootHookObject = {
  async beforeAll() {
    await AppDataSource.initialize()
    await AppDataSource.runMigrations()
  },

  async beforeEach() {
    for (const klass of ENTITY_TYPES) {
      await AppDataSource.getRepository(klass).clear()
    }
  },
}
