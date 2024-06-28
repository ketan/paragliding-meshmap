import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import { createIndices, dropIndices, primaryKeyType } from '../helpers/migration-helper.js'

export class CreateMapReportsTable1719575161036 implements MigrationInterface {
  tableName = 'map_reports'
  indices = ['node_id', 'created_at', 'updated_at']

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          { name: 'id', type: primaryKeyType(queryRunner), isPrimary: true, isGenerated: true, generationStrategy: 'increment' },

          { name: 'node_id', type: 'bigint', isNullable: false },

          { name: 'short_name', type: 'text', isNullable: false },
          { name: 'long_name', type: 'text', isNullable: false },
          { name: 'role', type: 'integer', isNullable: false },

          { name: 'hardware_model', type: 'integer', isNullable: false },
          { name: 'firmware_version', type: 'text', isNullable: false },

          { name: 'region', type: 'integer', isNullable: true },
          { name: 'modem_preset', type: 'integer', isNullable: true },
          { name: 'has_default_channel', type: 'boolean', isNullable: true },
          { name: 'latitude', type: 'integer', isNullable: true },
          { name: 'longitude', type: 'integer', isNullable: true },
          { name: 'altitude', type: 'integer', isNullable: true },
          { name: 'position_precision', type: 'integer', isNullable: true },
          { name: 'num_online_local_nodes', type: 'integer', isNullable: true },

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
