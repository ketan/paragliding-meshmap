import { ColumnType, QueryRunner, TableColumn, TableIndex } from 'typeorm'
import { AppDataSource } from '#config/data-source'

export function primaryKeyType(queryRunner: QueryRunner) {
  if (queryRunner.connection.options.type.includes('sqlite')) {
    return 'integer'
  } else {
    return 'bigint'
  }
}

export async function createIndices(queryRunner: QueryRunner, tableName: string, columnNames: string[]) {
  await queryRunner.createIndices(
    tableName,
    columnNames.map(
      (eachColumn) =>
        new TableIndex({
          name: `${tableName}_${eachColumn}_idx`,
          columnNames: [eachColumn],
        })
    )
  )
}

export async function dropIndices(queryRunner: QueryRunner, tableName: string, columnNames: string[]) {
  await queryRunner.dropIndices(
    tableName,
    columnNames.map(
      (eachColumn) =>
        new TableIndex({
          name: `${tableName}_${eachColumn}_idx`,
          columnNames: [eachColumn],
        })
    )
  )
}
export async function makeColumnsTimestamp(queryRunner: QueryRunner, table: string, columnNames: string[]) {
  if (queryRunner.connection.driver.options.type !== 'postgres') {
    return
  }

  for (let index = 0; index < columnNames.length; index++) {
    const column = columnNames[index]
    await queryRunner.query(`
        ALTER TABLE ${table}
            ALTER COLUMN ${column} SET DATA TYPE timestamp(3) USING ${column}::timestamp;`)
  }
}

export async function makeColumnsTimestampWithTZ(queryRunner: QueryRunner, table: string, columnNames: string[]) {
  if (queryRunner.connection.driver.options.type !== 'postgres') {
    return
  }

  for (let index = 0; index < columnNames.length; index++) {
    const column = columnNames[index]
    await queryRunner.query(`ALTER TABLE ${table}
        ALTER COLUMN ${column} SET DATA TYPE timestamp(3) with time zone USING ${column}::timestamp with time zone;`)
  }
}

export async function makeColumnNullable(queryRunner: QueryRunner, tableName: string, columnNames: string[]) {
  const table = await queryRunner.getTable(tableName)

  for (let index = 0; index < columnNames.length; index++) {
    const columnName = columnNames[index]
    const existingColumn = table?.findColumnByName(columnName)
    if (!existingColumn) {
      throw Error(`Column ${columnName} not found in table ${tableName}`)
    }
    await queryRunner.changeColumn(
      tableName,
      columnName,
      new TableColumn({ type: existingColumn.type, name: columnName, isNullable: true })
    )
  }
}
export function dateTimeType(): { type: ColumnType & string } | { type: ColumnType & string; precision: number } {
  if (AppDataSource.driver.supportedDataTypes.includes('datetime')) {
    return { type: 'datetime' }
  } else if (AppDataSource.driver.supportedDataTypes.includes('timestamp with time zone')) {
    return { type: 'timestamp with time zone', precision: 3 }
  } else if (AppDataSource.driver.supportedDataTypes.includes('timestamp')) {
    return { type: 'timestamp', precision: 3 }
  }
  throw new Error(
    `Unsupported datetime type for ${AppDataSource.options.type}. Supported types are ${AppDataSource.driver.supportedDataTypes}`
  )
}

export function blobType() {
  if (AppDataSource.driver.supportedDataTypes.includes('blob')) {
    return 'blob'
  } else if (AppDataSource.driver.supportedDataTypes.includes('bytea')) {
    return 'bytea'
  }
  throw new Error(`Unsupported blob type for ${AppDataSource.options.type}. Supported types are ${AppDataSource.driver.supportedDataTypes}`)
}

export function jsonType(): ColumnType & string {
  if (AppDataSource.driver.supportedDataTypes.includes('jsonb')) {
    return 'jsonb'
  } else if (AppDataSource.driver.supportedDataTypes.includes('json')) {
    return 'json'
  }
  throw new Error(
    `Unsupported json type for ${AppDataSource.driver.options.type}. Supported types are ${AppDataSource.driver.supportedDataTypes}`
  )
}
