import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class CreateAdditionalPositionFields1725103644805 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'positions',
      new TableColumn({
        name: 'sats_in_view',
        type: 'integer',
        isNullable: true,
      })
    )

    await queryRunner.addColumn(
      'positions',
      new TableColumn({
        name: 'precision_bits',
        type: 'integer',
        isNullable: true,
      })
    )

    await queryRunner.addColumn(
      'positions',
      new TableColumn({
        name: 'pdop',
        type: 'integer',
        isNullable: true,
      })
    )

    await queryRunner.addColumn(
      'positions',
      new TableColumn({
        name: 'timestamp',
        type: 'bigint',
        isNullable: true,
      })
    )

    await queryRunner.addColumn(
      'positions',
      new TableColumn({
        name: 'time',
        type: 'bigint',
        isNullable: true,
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('positions', ['sats_in_view', 'precision_bits', 'timestamp', 'pdop', 'time'])
  }
}
