import { QueryRunner, TableColumn, TableIndex } from 'typeorm'
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
    columnNames.map((eachColumn) => new TableIndex({ name: `${tableName}_${eachColumn}_idx`, columnNames: [eachColumn] }))
  )
}

export async function dropIndices(queryRunner: QueryRunner, tableName: string, columnNames: string[]) {
  await queryRunner.dropIndices(
    tableName,
    columnNames.map((eachColumn) => new TableIndex({ name: `${tableName}_${eachColumn}_idx`, columnNames: [eachColumn] }))
  )
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

export async function makeColumnNonNullable(queryRunner: QueryRunner, tableName: string, columnNames: string[]) {
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
      new TableColumn({ type: existingColumn.type, name: columnName, isNullable: false })
    )
  }
}

export function dateTimeType() {
  if (AppDataSource.driver.supportedDataTypes.includes('datetime')) {
    return 'datetime'
  } else if (AppDataSource.driver.supportedDataTypes.includes('timestamp')) {
    return 'timestamp'
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
