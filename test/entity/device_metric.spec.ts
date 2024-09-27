import DeviceMetric from '#entity/device_metric'
import { AppDataSource } from '#config/data-source'
import { DateTime, Duration } from 'luxon'
import { expect } from 'chai'
import { secondsAgo } from '#helpers/utils'

describe('DeviceMetric', () => {
  it('should find recent similar metric', async () => {
    const oneMinuteAgoMetric = new DeviceMetric({
      nodeId: 123,

      batteryLevel: 98,
      voltage: 3.3,
      channelUtilization: 0.5,
      airUtilTx: 0.1,
      uptimeSeconds: 123,
      createdAt: DateTime.now().minus({ minutes: 1 }).toJSDate(),
    })

    const recentMetric = new DeviceMetric({
      nodeId: 123,

      batteryLevel: 99,
      voltage: 3.3,
      channelUtilization: 0.5,
      airUtilTx: 0.1,
      uptimeSeconds: 123,
    })

    await AppDataSource.transaction(async (trx) => {
      await trx.save([oneMinuteAgoMetric, recentMetric])
    })

    expect(oneMinuteAgoMetric.id).to.exist
    expect(recentMetric.id).to.exist

    expect(await oneMinuteAgoMetric.findRecentSimilarMetric(AppDataSource, secondsAgo(2))).to.not.exist

    expect(await recentMetric.findRecentSimilarMetric(AppDataSource, secondsAgo(2))).to.deep.eq(
      await AppDataSource.manager.findOneBy(DeviceMetric, { id: recentMetric.id })
    )
  })

  it('should return device metrics for specified node', () => {
    const since = secondsAgo(2)
    const nodeId = 123

    return AppDataSource.transaction(async (trx) => {
      expect(await DeviceMetric.forNode(trx, nodeId, since, Duration.fromISO('PT10S'))).to.be.empty

      const metrics = [
        new DeviceMetric({
          nodeId: nodeId,
          batteryLevel: 99,
          voltage: 3.3,
          channelUtilization: 0.5,
          airUtilTx: 0.1,
          uptimeSeconds: 123,
          createdAt: DateTime.now().toJSDate(),
        }),
        new DeviceMetric({
          nodeId: 124,
          batteryLevel: 99,
          voltage: 3.3,
          channelUtilization: 0.5,
          airUtilTx: 0.1,
          uptimeSeconds: 123,
        }),
      ]

      await trx.save(metrics)

      const metricsForNode = await DeviceMetric.forNode(trx, nodeId, since, Duration.fromISO('PT10S'))
      expect(metricsForNode).to.deepEqualIgnoreUndefined([
        {
          batteryLevel: 99,
          voltage: 3.3,
          channelUtilization: 0.5,
          airUtilTx: 0.1,
          createdAt: metrics[0].createdAt,
        },
      ])
    })
  })
})
