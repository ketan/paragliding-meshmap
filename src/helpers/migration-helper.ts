import { QueryRunner, TableIndex } from 'typeorm'

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
