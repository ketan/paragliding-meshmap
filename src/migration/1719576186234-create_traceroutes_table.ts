import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import { createIndices, dateTimeType, dropIndices, jsonType, primaryKeyType } from '#helpers/migration-helper'

export class CreateTraceroutesTable1719576186234 implements MigrationInterface {
  tableName = 'traceroutes'
  indices = ['created_at', 'updated_at']

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
          { name: 'from', type: 'bigint', isNullable: false },
          { name: 'to', type: 'bigint', isNullable: false },

          { name: 'route', type: jsonType(), isNullable: true },
          { name: 'want_response', type: 'boolean', isNullable: false },
          { name: 'channel', type: 'integer', isNullable: true },
          { name: 'channel_id', type: 'text', isNullable: true },
          { name: 'gateway_id', type: 'bigint', isNullable: true },
          { name: 'packet_id', type: 'bigint', isNullable: true },

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
