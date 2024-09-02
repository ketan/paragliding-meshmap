import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class CreateFlyxcTokenColumn1725275615448 implements MigrationInterface {
  name = 'CreateFlyxcTokenColumn1725275615448'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'nodes',
      new TableColumn({
        name: 'fly_xc_token',
        type: 'text',
        isNullable: true,
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('nodes', ['fly_xc_token'])
  }
}
