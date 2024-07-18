import { rmSync } from 'fs'
import { RootHookObject } from 'mocha'
import { TestDataSource, testDbFile } from './test-data-source.js'
import { BaseType } from '#entity/base_type'

export const mochaHooks: RootHookObject = {
  async beforeAll() {
    rmSync(testDbFile, { force: true })
    await TestDataSource.initialize()
    await TestDataSource.runMigrations({ transaction: 'each' })
  },

  async afterEach() {
    const entityTypes = Array.from(TestDataSource.entityMetadatasMap.keys())

    for (let index = 0; index < entityTypes.length; index++) {
      const entity = entityTypes[index]
      if (entity === BaseType) {
        continue
      }
      await TestDataSource.manager.clear(entity)
    }
  },
}
