import { MigrationInterface, QueryRunner } from 'typeorm'
import { partitionTable } from '#helpers/create-partition'

export class CreatePartitionsDeviceMetrics1755606884271 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await partitionTable('device_metrics', queryRunner)
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
    // Implement down logic if needed
  }
}
