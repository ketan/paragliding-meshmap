import { MigrationInterface, QueryRunner } from 'typeorm'
import { makeColumnsTimestamp, makeColumnsTimestampWithTZ } from '#helpers/migration-helper'

export class AlterTimestampCols1724649959216 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await makeColumnsTimestampWithTZ(queryRunner, 'traceroutes', ['created_at', 'updated_at'])
    await makeColumnsTimestampWithTZ(queryRunner, 'service_envelopes', ['created_at', 'updated_at'])
    await makeColumnsTimestampWithTZ(queryRunner, 'neighbour_infos', ['created_at', 'updated_at'])
    await makeColumnsTimestampWithTZ(queryRunner, 'configs', ['created_at', 'updated_at'])

    await makeColumnsTimestampWithTZ(queryRunner, 'waypoints', ['created_at', 'updated_at'])
    await makeColumnsTimestampWithTZ(queryRunner, 'text_messages', ['created_at', 'updated_at'])
    await makeColumnsTimestampWithTZ(queryRunner, 'positions', ['created_at', 'updated_at'])
    await makeColumnsTimestampWithTZ(queryRunner, 'power_metrics', ['created_at', 'updated_at'])
    await makeColumnsTimestampWithTZ(queryRunner, 'environment_metrics', ['created_at', 'updated_at'])
    await makeColumnsTimestampWithTZ(queryRunner, 'device_metrics', ['created_at', 'updated_at'])
    await makeColumnsTimestampWithTZ(queryRunner, 'map_reports', ['created_at', 'updated_at'])
    await makeColumnsTimestampWithTZ(queryRunner, 'nodes', [
      'mqtt_connection_state_updated_at',
      'position_updated_at',
      'neighbours_updated_at',
      'created_at',
      'updated_at',
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await makeColumnsTimestamp(queryRunner, 'traceroutes', ['created_at', 'updated_at'])
    await makeColumnsTimestamp(queryRunner, 'service_envelopes', ['created_at', 'updated_at'])
    await makeColumnsTimestamp(queryRunner, 'neighbour_infos', ['created_at', 'updated_at'])
    await makeColumnsTimestamp(queryRunner, 'configs', ['created_at', 'updated_at'])
    await makeColumnsTimestamp(queryRunner, 'waypoints', ['created_at', 'updated_at'])
    await makeColumnsTimestamp(queryRunner, 'text_messages', ['created_at', 'updated_at'])
    await makeColumnsTimestamp(queryRunner, 'positions', ['created_at', 'updated_at'])
    await makeColumnsTimestamp(queryRunner, 'power_metrics', ['created_at', 'updated_at'])
    await makeColumnsTimestamp(queryRunner, 'environment_metrics', ['created_at', 'updated_at'])
    await makeColumnsTimestamp(queryRunner, 'device_metrics', ['created_at', 'updated_at'])
    await makeColumnsTimestamp(queryRunner, 'map_reports', ['created_at', 'updated_at'])
    await makeColumnsTimestamp(queryRunner, 'nodes', [
      'mqtt_connection_state_updated_at',
      'position_updated_at',
      'neighbours_updated_at',
      'created_at',
      'updated_at',
    ])
  }
}
