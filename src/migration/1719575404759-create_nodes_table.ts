import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import { createIndices, dateTimeType, dropIndices } from '#helpers/migration-helper'

export class CreateNodesTable1719575404759 implements MigrationInterface {
  tableName = 'nodes'
  indices = ['node_id', 'created_at', 'updated_at']

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          { name: 'node_id', type: 'bigint', isNullable: false, isUnique: true, isPrimary: true, isGenerated: false },

          { name: 'long_name', type: 'text', isNullable: true },
          { name: 'short_name', type: 'text', isNullable: true },
          { name: 'hardware_model', type: 'integer', isNullable: true },
          { name: 'is_licensed', type: 'boolean', isNullable: true },
          { name: 'role', type: 'integer', isNullable: true },

          { name: 'altitude', type: 'integer', isNullable: true },
          { name: 'latitude', type: 'integer', isNullable: true },
          { name: 'longitude', type: 'integer', isNullable: true },
          { name: 'position_updated_at', type: dateTimeType(), isNullable: true },

          { name: 'air_util_tx', type: 'double precision', isNullable: true },
          { name: 'battery_level', type: 'integer', isNullable: true },
          { name: 'channel_utilization', type: 'double precision', isNullable: true },
          { name: 'voltage', type: 'double precision', isNullable: true },
          { name: 'neighbour_broadcast_interval_secs', type: 'integer', isNullable: true },
          { name: 'neighbours', type: 'json', isNullable: true },
          { name: 'neighbours_updated_at', type: dateTimeType(), isNullable: true },

          { name: 'inbox', type: 'json', isNullable: true },
          { name: 'outbox', type: 'json', isNullable: true },

          { name: 'mqtt_connection_state', type: 'text', isNullable: true },
          { name: 'mqtt_connection_state_updated_at', type: dateTimeType(), isNullable: true },

          { name: 'firmware_version', type: 'text', isNullable: true },
          { name: 'has_default_channel', type: 'boolean', isNullable: true },
          { name: 'modem_preset', type: 'integer', isNullable: true },
          { name: 'num_online_local_nodes', type: 'integer', isNullable: true },
          { name: 'position_precision', type: 'integer', isNullable: true },
          { name: 'region', type: 'integer', isNullable: true },
          { name: 'uptime_seconds', type: 'bigint', isNullable: true },

          { name: 'barometric_pressure', type: 'double precision', isNullable: true },
          { name: 'relative_humidity', type: 'double precision', isNullable: true },
          { name: 'temperature', type: 'double precision', isNullable: true },

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
