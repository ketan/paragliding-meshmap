import { DataSource } from 'typeorm'
import debug from 'debug'
import Position from '#entity/position'
import DeviceMetric from '#entity/device_metric'
import EnvironmentMetric from '#entity/environment_metric'
import { Duration } from 'luxon'

async function dumpCounts(db: DataSource, logger: debug.Debugger) {
  const response = await db.query<
    {
      relname: string
      n_live_tup: bigint
      n_dead_tup: bigint
    }[]
  >(`SELECT relname, n_live_tup, n_dead_tup
     FROM pg_stat_user_tables`)
  logger(`Record count (estimates)`, response)
}

async function dumpPositionStats(db: DataSource, logger: debug.Debugger) {
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
  logger(`Position count grouped by node`, await Position.countByNodeId(db, twentyFourHoursAgo, Duration.fromObject({ days: 1 })))
  logger(`Position count grouped by gateway`, await Position.countByGatewayId(db, twentyFourHoursAgo, Duration.fromObject({ days: 1 })))
}

async function dumpDeviceMetricsStats(db: DataSource, logger: debug.Debugger) {
  const deviceMetricsRepository = db.getRepository(DeviceMetric)
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)

  const response = await deviceMetricsRepository
    .createQueryBuilder('deviceMetrics')
    .select('deviceMetrics.nodeId', 'node_id')
    .addSelect('COUNT(*)', 'metrics_count')
    .where('deviceMetrics.createdAt >= :twentyFourHoursAgo', { twentyFourHoursAgo })
    .groupBy('deviceMetrics.nodeId')
    .orderBy('metrics_count', 'DESC')
    .limit(20)
    .getRawMany()

  logger(`Device metrics count grouped by node`, response)
}

async function dumpEnvironmentMetricsStats(db: DataSource, logger: debug.Debugger) {
  const environmentMetricsRepository = db.getRepository(EnvironmentMetric)
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)

  const response = await environmentMetricsRepository
    .createQueryBuilder('environmentMetrics')
    .select('environmentMetrics.nodeId', 'node_id')
    .addSelect('COUNT(*)', 'metrics_count')
    .where('environmentMetrics.createdAt >= :twentyFourHoursAgo', { twentyFourHoursAgo })
    .groupBy('environmentMetrics.nodeId')
    .orderBy('metrics_count', 'DESC')
    .limit(20)
    .getRawMany()

  logger(`Environment metrics count grouped by node`, response)
}

export async function dumpStats(db: DataSource, logger: debug.Debugger) {
  await dumpCounts(db, logger)
  await dumpPositionStats(db, logger)
  await dumpDeviceMetricsStats(db, logger)
  await dumpEnvironmentMetricsStats(db, logger)
}
