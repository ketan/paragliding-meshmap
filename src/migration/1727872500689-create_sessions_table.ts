import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import { createIndices, dateTimeType, dropIndices } from '#helpers/migration-helper'

export class CreateSessionsTable1727872500689 implements MigrationInterface {
  tableName = 'sessions'
  indices = ['expired_at']

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '255',
            isPrimary: true,
            isGenerated: false,
          },

          { name: 'expired_at', type: 'bigint', isNullable: false },
          { name: 'json', type: 'text', isNullable: false },

          {
            name: 'destroyed_at',
            ...dateTimeType(),
            isNullable: true,
          },
        ],
      })
    )
    await createIndices(queryRunner, this.tableName, this.indices)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await dropIndices(queryRunner, this.tableName, this.indices)
    await queryRunner.dropTable(this.tableName)
  }
}
