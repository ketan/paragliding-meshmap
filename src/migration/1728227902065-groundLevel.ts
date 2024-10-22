import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class GroundLevel1728227902065 implements MigrationInterface {
  name = 'GroundLevel1728227902065'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('positions', [new TableColumn({ name: 'above_ground_level', type: 'integer', isNullable: true })])
    await queryRunner.addColumns('nodes', [new TableColumn({ name: 'above_ground_level', type: 'integer', isNullable: true })])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('positions', ['above_ground_level'])
    await queryRunner.dropColumns('nodes', ['above_ground_level'])
  }
}
