import { AppDataSource } from '#config/data-source'
import { DateTime } from 'luxon'
import { expect } from 'chai'
import { secondsAgo } from '#helpers/utils'
import PowerMetric from '#entity/power_metric'

describe('PowerMetric', () => {
  it('should find recent similar metric', async () => {
    const oneMinuteAgoMetric = new PowerMetric({
      nodeId: 123,

      ch1Current: 1.1,
      ch2Current: 2.2,
      ch3Current: 3.3,
      ch1Voltage: 1.2,
      ch2Voltage: 2.3,
      ch3Voltage: 3.4,

      createdAt: DateTime.now().minus({ minutes: 1 }).toJSDate(),
    })

    const recentMetric = new PowerMetric({
      nodeId: 123,

      ch1Current: 11,
      ch2Current: 22,
      ch3Current: 33,
      ch1Voltage: 12,
      ch2Voltage: 23,
      ch3Voltage: 34,
    })

    await AppDataSource.manager.save([oneMinuteAgoMetric, recentMetric])

    expect(oneMinuteAgoMetric.id).to.exist
    expect(recentMetric.id).to.exist

    expect(await oneMinuteAgoMetric.findRecentSimilarMetric(AppDataSource, secondsAgo(2))).to.not.exist
    expect(await recentMetric.findRecentSimilarMetric(AppDataSource, secondsAgo(2))).to.deep.eq(recentMetric)
  })
})
