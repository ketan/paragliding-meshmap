import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import { createIndices, dateTimeType, dropIndices, jsonType, primaryKeyType } from '#helpers/migration-helper'

export class CreateConfigs1724404727036 implements MigrationInterface {
  tableName = 'configs'
  indices = ['key', 'created_at', 'updated_at']

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

          { name: 'key', type: 'text', isNullable: false },
          { name: 'value', type: jsonType(), isNullable: false },

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
