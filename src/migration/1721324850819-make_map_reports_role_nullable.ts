import { makeColumnNonNullable, makeColumnNullable } from '#helpers/migration-helper'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class MakeMapReportsRoleNullable1721324850819 implements MigrationInterface {
  tableName = 'map_reports'
  columns = ['role']

  public async up(queryRunner: QueryRunner): Promise<void> {
    await makeColumnNullable(queryRunner, this.tableName, this.columns)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await makeColumnNonNullable(queryRunner, this.tableName, this.columns)
  }
}
