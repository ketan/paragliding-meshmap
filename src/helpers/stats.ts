import { DataSource } from 'typeorm'
import debug from 'debug'
import Position from '#entity/position'

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
  const positionRepository = db.getRepository(Position)
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)

  const response = await positionRepository
    .createQueryBuilder('position')
    .select('position.nodeId', 'node_id')
    .addSelect('COUNT(*)', 'position_count')
    .where('position.createdAt >= :twentyFourHoursAgo', { twentyFourHoursAgo })
    .groupBy('position.nodeId')
    .orderBy('position_count', 'DESC')
    .limit(20)
    .getRawMany()

  logger(`Position count grouped by node`, response)
}

export async function dumpStats(db: DataSource, logger: debug.Debugger) {
  await dumpCounts(db, logger)
  await dumpPositionStats(db, logger)
}
