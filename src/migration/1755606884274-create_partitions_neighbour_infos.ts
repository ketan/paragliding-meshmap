import { MigrationInterface, QueryRunner } from 'typeorm'
import { partitionTable } from '#helpers/create-partition'

export class CreatePartitionsNeighbourInfos1755606884274 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await partitionTable('neighbour_infos', queryRunner)
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
    // Implement down logic if needed
  }
}
