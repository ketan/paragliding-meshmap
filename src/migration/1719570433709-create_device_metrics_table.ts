import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import { createIndices, dropIndices, primaryKeyType, dateTimeType } from '#helpers/migration-helper'

export class CreateDeviceMetricsTable1719570433709 implements MigrationInterface {
  tableName = 'device_metrics'
  indices = ['node_id', 'created_at', 'updated_at']

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          { name: 'id', type: primaryKeyType(queryRunner), isPrimary: true, isGenerated: true, generationStrategy: 'increment' },

          { name: 'node_id', type: 'bigint', isNullable: false },

          { name: 'battery_level', type: 'integer', isNullable: true },
          { name: 'voltage', type: 'double precision', isNullable: true },
          { name: 'channel_utilization', type: 'double precision', isNullable: true },
          { name: 'air_util_tx', type: 'double precision', isNullable: true },
          { name: 'uptime_seconds', type: 'bigint', isNullable: true },

          {
            name: 'created_at',
            type: dateTimeType(),
            isNullable: false,
            default: queryRunner.connection.driver.mappedDataTypes.createDateDefault,
          },
          {
            name: 'updated_at',
            type: dateTimeType(),
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
