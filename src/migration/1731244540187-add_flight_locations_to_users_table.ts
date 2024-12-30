import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'
import { jsonType } from '#helpers/migration-helper'

export class AddFlightLocationsToUsersTable1731244540187 implements MigrationInterface {
  readonly table = 'users'
  readonly columns = [
    new TableColumn({
      name: 'flight_locations',
      type: jsonType(),
      isNullable: true,
    }),
    new TableColumn({
      name: 'admin_locations',
      type: jsonType(),
      isNullable: true,
    }),
  ]

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn(this.table, 'admin', 'super_user')
    await queryRunner.addColumns(this.table, this.columns)

    await queryRunner.query(`UPDATE ${this.table} SET flight_locations = '["Bir"]' WHERE flight_locations IS NULL`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn(this.table, 'super_user', 'admin')
    await queryRunner.dropColumns(this.table, this.columns)
  }
}
