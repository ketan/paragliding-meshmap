import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class CreateAdditionalPositionFieldsInNode1725111030763 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'nodes',
      new TableColumn({
        name: 'sats_in_view',
        type: 'integer',
        isNullable: true,
      })
    )

    await queryRunner.addColumn(
      'nodes',
      new TableColumn({
        name: 'position_precision_bits',
        type: 'integer',
        isNullable: true,
      })
    )

    await queryRunner.addColumn(
      'nodes',
      new TableColumn({
        name: 'position_pdop',
        type: 'integer',
        isNullable: true,
      })
    )

    await queryRunner.addColumn(
      'nodes',
      new TableColumn({
        name: 'position_timestamp',
        type: 'bigint',
        isNullable: true,
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('nodes', ['sats_in_view', 'position_precision_bits', 'position_timestamp', 'position_pdop'])
  }
}
