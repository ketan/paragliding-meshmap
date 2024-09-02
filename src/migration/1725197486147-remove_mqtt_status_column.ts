import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'
import { dateTimeType } from '#helpers/migration-helper'

export class RemoveMqttStatusColumn1725197486147 implements MigrationInterface {
  name = 'RemoveMqttStatusColumn1725197486147'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('nodes', ['mqtt_connection_state', 'mqtt_connection_state_updated_at'])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('nodes', [
      new TableColumn({ name: 'mqtt_connection_state', type: 'text', isNullable: true }),
      new TableColumn({ name: 'mqtt_connection_state_updated_at', ...dateTimeType(), isNullable: true }),
    ])
  }
}
