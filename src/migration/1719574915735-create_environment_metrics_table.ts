import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import { createIndices, dateTimeType, dropIndices, primaryKeyType } from '#helpers/migration-helper'

export class CreateEnvironmentMetricsTable1719574915735 implements MigrationInterface {
  tableName = 'environment_metrics'
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

          { name: 'temperature', type: 'double precision', isNullable: true },
          { name: 'relative_humidity', type: 'double precision', isNullable: true },
          { name: 'barometric_pressure', type: 'double precision', isNullable: true },
          { name: 'gas_resistance', type: 'double precision', isNullable: true },
          { name: 'voltage', type: 'double precision', isNullable: true },
          { name: 'current', type: 'double precision', isNullable: true },
          { name: 'iaq', type: 'integer', isNullable: true },

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
