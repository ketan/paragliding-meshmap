import { DataSource } from 'typeorm'
import { CronJob } from 'cron'
import { createMonthlyPartitions } from '#helpers/create-partition'
import { autoPartitionLogger } from '#helpers/logger'

const PARTITIONED_TABLES = [
  'device_metrics',
  'environment_metrics',
  'map_reports',
  'neighbor_infos',
  'positions',
  'power_metrics',
  'service_envelopes',
  'text_messages',
  'traceroutes',
  'waypoints',
]

export async function autoPartitionTable(tableName: string, db: DataSource) {
  try {
    await db.transaction(async (trx) => {
      autoPartitionLogger(`Auto partitioning ${tableName}`)
      const queryRunner = trx.queryRunner

      if (!queryRunner) {
        throw new Error('QueryRunner is not available in the transaction context')
      }

      if (!(await queryRunner.hasTable(tableName))) {
        autoPartitionLogger(`Table ${tableName} does not exist, skipping partitioning.`)
        return false
      }

      const isPartitionedResponse = await trx.query<{ is_partitioned: boolean | number }[]>(
        `
          SELECT EXISTS (SELECT 1
                         FROM pg_partitioned_table pt
                                JOIN pg_class c ON pt.partrelid = c.oid
                         WHERE c.relname = '${tableName}') AS is_partitioned;
        `
      )

      const isPartitioned = isPartitionedResponse[0]?.is_partitioned === true || isPartitionedResponse[0]?.is_partitioned === 1

      if (isPartitioned) {
        autoPartitionLogger(`Table ${tableName} is partitioned, checking if new partitioned need to be created.`)
        await createMonthlyPartitions(tableName, queryRunner)
      } else {
        autoPartitionLogger(`Table ${tableName} is not partitioned, skipping.`)
      }
    })
  } catch (error) {
    console.error(`Error in autoPartitionTable for ${tableName}:`, error)
  }
}

export function autoPartition(db: DataSource) {
  CronJob.from({
    cronTime: '5 * * * *', // Every hour on the 5th minute
    runOnInit: true,
    onTick: async () => {
      for (const tableName of PARTITIONED_TABLES) {
        await autoPartitionTable(tableName, db)
      }
    },
    start: true,
    timeZone: 'UTC',
  })
}
