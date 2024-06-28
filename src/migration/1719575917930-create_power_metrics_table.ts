import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import { createIndices, dropIndices, primaryKeyType } from '../helpers/migration-helper'

export class CreatePowerMetricsTable1719575917930 implements MigrationInterface {
  tableName = 'power_metrics'
  indices = ['node_id', 'created_at', 'updated_at']

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          { name: 'id', type: primaryKeyType(queryRunner), isPrimary: true, isGenerated: true, generationStrategy: 'increment' },

          { name: 'node_id', type: 'bigint', isNullable: false, isUnique: true },

          { name: 'ch1voltage', type: 'double', isNullable: true },
          { name: 'ch1current', type: 'double', isNullable: true },

          { name: 'ch2voltage', type: 'double', isNullable: true },
          { name: 'ch2current', type: 'double', isNullable: true },

          { name: 'ch3voltage', type: 'double', isNullable: true },
          { name: 'ch3current', type: 'double', isNullable: true },

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
