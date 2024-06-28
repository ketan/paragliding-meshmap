import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import { createIndices, dropIndices, primaryKeyType } from '../helpers/migration-helper'

export class CreateEnvironmentMetricsTable1719574915735 implements MigrationInterface {
  tableName = 'environment_metrics'
  indices = ['node_id', 'created_at', 'updated_at']

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          { name: 'id', type: primaryKeyType(queryRunner), isPrimary: true, isGenerated: true, generationStrategy: 'increment' },

          { name: 'node_id', type: 'bigint', isNullable: false },

          { name: 'temperature', type: 'double', isNullable: true },
          { name: 'relative_humidity', type: 'double', isNullable: true },
          { name: 'barometric_pressure', type: 'double', isNullable: true },
          { name: 'gas_resistance', type: 'double', isNullable: true },
          { name: 'voltage', type: 'double', isNullable: true },
          { name: 'current', type: 'double', isNullable: true },
          { name: 'iaq', type: 'integer', isNullable: true },

          { name: 'created_at', type: 'datetime', isNullable: false },
          { name: 'updated_at', type: 'datetime', isNullable: false },
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
