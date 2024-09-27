import { AppDataSource } from '#config/data-source'
import { expect } from 'chai'
import { secondsAgo } from '#helpers/utils'
import EnvironmentMetric from '#entity/environment_metric'
import { DateTime, Duration } from 'luxon'

describe('EnvironmentMetric', () => {
  it('should find recent similar metric', async () => {
    const oneMinuteAgoMetric = new EnvironmentMetric({
      nodeId: 123,
      iaq: 98,
      temperature: 32,
      relativeHumidity: 0.5,
      gasResistance: 123,
      barometricPressure: 1013.25,
      voltage: 3.3,
      current: 32,
      createdAt: DateTime.now().minus({ minutes: 1 }).toJSDate(),
    })

    const recentMetric = new EnvironmentMetric({
      nodeId: 123,

      iaq: 111,
      temperature: 42,
      relativeHumidity: 0.7,
      gasResistance: 123,
      barometricPressure: 1012.25,
      voltage: 4.2,
      current: 32,
    })

    await AppDataSource.transaction(async (trx) => {
      await trx.save([oneMinuteAgoMetric, recentMetric])
    })

    expect(oneMinuteAgoMetric.id).to.exist
    expect(recentMetric.id).to.exist

    expect(await oneMinuteAgoMetric.findRecentSimilarMetric(AppDataSource, secondsAgo(2))).to.not.exist
    expect(await recentMetric.findRecentSimilarMetric(AppDataSource, secondsAgo(2))).to.deep.eq(
      await AppDataSource.manager.findOneBy(EnvironmentMetric, { id: recentMetric.id })
    )
  })

  it('should return device metrics for specified node', () => {
    const since = secondsAgo(2)
    const nodeId = 123

    return AppDataSource.transaction(async (trx) => {
      expect(await EnvironmentMetric.forNode(trx, nodeId, since, Duration.fromISO('PT10S'))).to.be.empty

      const metrics = [
        new EnvironmentMetric({
          nodeId: nodeId,

          iaq: 98,
          temperature: 32,
          relativeHumidity: 0.5,
          gasResistance: 123,
          barometricPressure: 1013.25,
          voltage: 3.3,
          current: 32,
        }),
        new EnvironmentMetric({
          nodeId: 124,

          iaq: 111,
          temperature: 42,
          relativeHumidity: 0.7,
          gasResistance: 123,
          barometricPressure: 1012.25,
          voltage: 4.2,
          current: 32,
        }),
      ]

      await trx.save(metrics)

      const metricsForNode = await EnvironmentMetric.forNode(trx, nodeId, since, Duration.fromISO('PT10S'))
      expect(metricsForNode).to.deepEqualIgnoreUndefined([
        {
          temperature: 32,
          relativeHumidity: 0.5,
          barometricPressure: 1013.25,
          createdAt: metrics[0].createdAt,
        },
      ])
    })
  })
})
