import { MigrationInterface, QueryRunner } from 'typeorm'
import { partitionTable } from '#helpers/create-partition'

export class CreatePartitionsTraceroutes1755606884279 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await partitionTable('traceroutes', queryRunner)
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
    // Implement down logic if needed
  }
}
