import { MigrationInterface, QueryRunner } from 'typeorm'
import { partitionTable } from '#helpers/create-partition'

export class CreatePartitionsPowerMetrics1755606884276 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await partitionTable('power_metrics', queryRunner)
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
    // Implement down logic if needed
  }
}
