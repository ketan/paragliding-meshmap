import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import { createIndices, dateTimeType, dropIndices, primaryKeyType } from '#helpers/migration-helper'

export class CreateLocationsTable1731246653322 implements MigrationInterface {
  tableName = 'locations'
  indices = ['created_at', 'updated_at', 'location']

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: primaryKeyType(queryRunner),
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },

          {
            name: 'location',
            type: 'text',
            isNullable: false,
            isUnique: true,
          },

          {
            name: 'created_at',
            ...dateTimeType(),
            isNullable: false,
            default: queryRunner.connection.driver.mappedDataTypes.createDateDefault,
          },
          {
            name: 'updated_at',
            ...dateTimeType(),
            isNullable: false,
            default: queryRunner.connection.driver.mappedDataTypes.updateDateDefault,
          },
        ],
      })
    )

    await createIndices(queryRunner, this.tableName, this.indices)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await dropIndices(queryRunner, this.tableName, this.indices)
    await queryRunner.dropTable(this.tableName)
  }
}
