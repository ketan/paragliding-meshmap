import PowerMetric from '#entity/power_metric'
import { expect } from 'chai'
import { AppDataSource } from '#config/data-source'

describe('PowerMetric', () => {
  it('should save', async () => {
    const pm = new PowerMetric()
    pm.nodeId = 123

    expect(pm.id).to.not.exist

    await AppDataSource.transaction(async (trx) => {
      await trx.save(pm)
    })

    expect(pm.id).to.exist
  })
})
