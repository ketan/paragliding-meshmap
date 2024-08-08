import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import { createIndices, dateTimeType, dropIndices, primaryKeyType } from '#helpers/migration-helper'

export class CreatePowerMetricsTable1719575917930 implements MigrationInterface {
  tableName = 'power_metrics'
  indices = ['node_id', 'created_at', 'updated_at']

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

          { name: 'node_id', type: 'bigint', isNullable: false },

          { name: 'ch_1_voltage', type: 'double precision', isNullable: true },
          { name: 'ch_1_current', type: 'double precision', isNullable: true },

          { name: 'ch_2_voltage', type: 'double precision', isNullable: true },
          { name: 'ch_2_current', type: 'double precision', isNullable: true },

          { name: 'ch_3_voltage', type: 'double precision', isNullable: true },
          { name: 'ch_3_current', type: 'double precision', isNullable: true },

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
