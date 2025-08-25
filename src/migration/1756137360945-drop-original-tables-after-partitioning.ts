import { MigrationInterface, QueryRunner } from 'typeorm'

export class DropOriginalTablesAfterPartitioning1756137360945 implements MigrationInterface {
  PARTITIONED_TABLES = [
    'device_metrics',
    'environment_metrics',
    'map_reports',
    'neighbor_infos',
    'positions',
    'power_metrics',
    'service_envelopes',
    'text_messages',
    'traceroutes',
    'waypoints',
  ]

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const tableName of this.PARTITIONED_TABLES) {
      await queryRunner.query(`ALTER SEQUENCE IF EXISTS ${tableName}_id_seq OWNED BY ${tableName}.id;`)
      await queryRunner.query(`DROP TABLE IF EXISTS ${tableName}_original;`)
    }
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {}
}
