import PowerMetric from '#entity/power_metric'
import { expect } from 'chai'
import { TestDataSource } from '../test-data-source.js'

describe('PowerMetric', () => {
  it('should save', async () => {
    const pm = new PowerMetric()
    pm.nodeId = 123

    expect(pm.id).to.not.exist

    await TestDataSource.transaction(async (trx) => {
      await trx.save(pm)
    })

    expect(pm.id).to.exist
  })
})
