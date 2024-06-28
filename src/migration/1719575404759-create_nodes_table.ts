import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import { createIndices, dropIndices, primaryKeyType } from '../helpers/migration-helper.js'

export class CreateNodesTable1719575404759 implements MigrationInterface {
  tableName = 'nodes'
  indices = ['node_id', 'created_at', 'updated_at']

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          { name: 'id', type: primaryKeyType(queryRunner), isPrimary: true, isGenerated: true, generationStrategy: 'increment' },

          { name: 'node_id', type: 'bigint', isNullable: false, isUnique: true },

          { name: 'long_name', type: 'text', isNullable: true },
          { name: 'short_name', type: 'text', isNullable: true },
          { name: 'hardware_model', type: 'integer', isNullable: true },
          { name: 'is_licensed', type: 'boolean', isNullable: true },
          { name: 'role', type: 'integer', isNullable: true },

          { name: 'altitude', type: 'integer', isNullable: true },
          { name: 'latitude', type: 'integer', isNullable: true },
          { name: 'longitude', type: 'integer', isNullable: true },
          { name: 'position_updated_at', type: 'datetime', isNullable: true },

          { name: 'air_util_tx', type: 'double', isNullable: true },
          { name: 'battery_level', type: 'integer', isNullable: true },
          { name: 'channel_utilization', type: 'double', isNullable: true },
          { name: 'voltage', type: 'double', isNullable: true },
          { name: 'neighbour_broadcast_interval_secs', type: 'integer', isNullable: true },
          { name: 'neighbours', type: 'json', isNullable: true },
          { name: 'neighbours_updated_at', type: 'datetime', isNullable: true },

          { name: 'mqtt_connection_state', type: 'text', isNullable: true },
          { name: 'mqtt_connection_state_updated_at', type: 'datetime', isNullable: true },

          { name: 'firmware_version', type: 'text', isNullable: true },
          { name: 'has_default_channel', type: 'boolean', isNullable: true },
          { name: 'modem_preset', type: 'integer', isNullable: true },
          { name: 'num_online_local_nodes', type: 'integer', isNullable: true },
          { name: 'position_precision', type: 'integer', isNullable: true },
          { name: 'region', type: 'integer', isNullable: true },
          { name: 'uptime_seconds', type: 'bigint', isNullable: true },

          { name: 'barometric_pressure', type: 'double', isNullable: true },
          { name: 'relative_humidity', type: 'double', isNullable: true },
          { name: 'temperature', type: 'double', isNullable: true },

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
