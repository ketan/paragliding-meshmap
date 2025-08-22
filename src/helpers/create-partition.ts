import { QueryRunner } from 'typeorm'
import { DateTime } from 'luxon'
import { autoPartitionLogger } from '#helpers/logger'

type ColumnDefinition = {
  column_name: string
  data_type: string
  is_nullable: string
  column_default: string
}

interface IndexDefinition {
  indexname: string
  indexdef: string
}

async function newPartitionedTableDefinitionSQL(queryRunner: QueryRunner, tableName: string) {
  const originalTableDefinition: ColumnDefinition[] = await queryRunner.query(`
    SELECT column_name, data_type, is_nullable, column_default
    FROM information_schema.columns
    WHERE table_name = '${tableName}'
    ORDER BY ordinal_position
  `)

  // Get columns from original table
  const columns = originalTableDefinition.map((col) => {
    const def = col.column_default ? ` DEFAULT ${col.column_default}` : ''
    const nullable = col.is_nullable === 'NO' ? 'NOT NULL' : ''
    return `"${col.column_name}" ${col.data_type} ${nullable}${def}`.trim()
  })

  return `CREATE TABLE ${tableName} (${columns.join(', ')}) PARTITION BY RANGE (created_at);`
}

export async function createMonthlyPartitions(
  tableName: string,
  queryRunner: { query(query: string, parameters?: unknown[]): Promise<unknown> }
) {
  const start = DateTime.utc(2024, 8, 1).startOf('month')
  const end = DateTime.now().plus({ months: 4 }).startOf('month')

  let month = start
  while (month < end) {
    const nextMonth = month.plus({ months: 1 })
    const partName = `${tableName}_p_${month.toFormat('yyyy_MM')}`
    const from = month.toFormat("yyyy-LL-01'T'00:00:00'+00'")
    const to = nextMonth.toFormat("yyyy-LL-01'T'00:00:00'+00'")
    const createPartitionSQL = `CREATE TABLE IF NOT EXISTS ${partName} PARTITION OF ${tableName} FOR VALUES FROM ('${from}') TO ('${to}');`
    await queryRunner.query(createPartitionSQL)
    month = nextMonth
  }
}

export async function partitionTable(tableName: string, queryRunner: QueryRunner) {
  const originalIndexDefs: IndexDefinition[] = await queryRunner.query(`
    SELECT indexname, indexdef
    FROM pg_indexes
    WHERE tablename = '${tableName}'
      AND schemaname = 'public'
      AND indexname NOT LIKE 'PK_%'
  `)

  const originalPrimaryKeyIndexDefs: IndexDefinition[] = await queryRunner.query(`
    SELECT indexname, indexdef
    FROM pg_indexes
    WHERE tablename = '${tableName}'
      AND schemaname = 'public'
      AND indexdef LIKE 'CREATE UNIQUE INDEX %'
  `)

  const createNewPartitionedTableSQL = await newPartitionedTableDefinitionSQL(queryRunner, tableName)

  const backupTable = `${tableName}_original`

  // 1. Rename the original table to a temporary name
  await queryRunner.query(`ALTER TABLE ${tableName} RENAME TO ${backupTable};`)

  autoPartitionLogger(`Creating partitioned ${tableName}`)
  await queryRunner.query(createNewPartitionedTableSQL)
  await createMonthlyPartitions(tableName, queryRunner)

  // 3. Copy data from old table to new partitioned table
  await queryRunner.query(`INSERT INTO ${tableName} SELECT * FROM ${backupTable};`)

  // 4. Add indices from the original table to the new partitioned table
  for (const { indexname, indexdef } of originalIndexDefs) {
    // Drop the old index if it exists (safe for idempotency)
    await queryRunner.query(`DROP INDEX "${indexname}";`)
    // Replace old table name with new table name in index definition
    // const newIndexDef = indexdef.replace(`${tableName}_old_unpartitioned`, tableName)
    autoPartitionLogger(`Recreating index on ${tableName}:`)
    await queryRunner.query(indexdef)
  }

  // 5. Update primary key to include created_at
  for (const { indexname } of originalPrimaryKeyIndexDefs) {
    await queryRunner.query(`ALTER TABLE ${backupTable} DROP CONSTRAINT "${indexname}";`)
    await queryRunner.createPrimaryKey(tableName, ['id', 'created_at'])
  }
}
