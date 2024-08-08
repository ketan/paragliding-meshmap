import { makeColumnNonNullable, makeColumnNullable } from '#helpers/migration-helper'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class MakePositionsToNullable1721383101186 implements MigrationInterface {
  tableName = 'positions'
  columns = ['to']

  public async up(queryRunner: QueryRunner): Promise<void> {
    await makeColumnNullable(queryRunner, this.tableName, this.columns)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await makeColumnNonNullable(queryRunner, this.tableName, this.columns)
  }
}
