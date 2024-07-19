import { makeColumnNonNullable, makeColumnNullable } from '#helpers/migration-helper'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class MakeServiceEnvelopeToNullable1721355398071 implements MigrationInterface {
  tableName = 'service_envelopes'
  columns = ['from', 'to']

  public async up(queryRunner: QueryRunner): Promise<void> {
    await makeColumnNullable(queryRunner, this.tableName, this.columns)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await makeColumnNonNullable(queryRunner, this.tableName, this.columns)
  }
}
