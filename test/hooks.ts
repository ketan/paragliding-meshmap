import { RootHookObject } from 'mocha'
import { AppDataSource } from '#config/data-source'

export const mochaHooks: RootHookObject = {
  async beforeAll() {
    await AppDataSource.initialize()
    await AppDataSource.runMigrations()
  },

  async afterEach() {},
}
