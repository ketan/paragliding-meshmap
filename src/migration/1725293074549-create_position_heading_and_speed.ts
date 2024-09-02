import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class CreatePositionHeadingAndSpeed1725293074549 implements MigrationInterface {
  name = 'CreatePositionHeadingAndSpeed1725293074549'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('positions', [
      new TableColumn({ name: 'ground_speed', type: 'double precision', isNullable: true }),
      new TableColumn({ name: 'ground_track', type: 'double precision', isNullable: true }),
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('positions', ['ground_speed', 'ground_track'])
  }
}
