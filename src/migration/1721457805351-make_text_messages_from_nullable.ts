import { makeColumnNonNullable, makeColumnNullable } from '#helpers/migration-helper'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class MakeTextMessagesFromNullable1721457805351 implements MigrationInterface {
  tableName = 'text_messages'
  columns = ['from']

  public async up(queryRunner: QueryRunner): Promise<void> {
    await makeColumnNullable(queryRunner, this.tableName, this.columns)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await makeColumnNonNullable(queryRunner, this.tableName, this.columns)
  }
}
