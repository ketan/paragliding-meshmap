import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class Activity1728348651403 implements MigrationInterface {
  name = 'Activity1728348651403'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('nodes', [new TableColumn({ name: 'activity', type: 'text', isNullable: true })])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('nodes', ['activity'])
  }
}
