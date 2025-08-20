import { MigrationInterface, QueryRunner } from 'typeorm'
import { partitionTable } from '#helpers/create-partition'

export class CreatePartitionsTextMessages1755606884278 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await partitionTable('text_messages', queryRunner)
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
    // Implement down logic if needed
  }
}
