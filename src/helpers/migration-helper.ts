import { QueryRunner, TableIndex } from 'typeorm'
import { AppDataSource } from '../data-source.js'

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
