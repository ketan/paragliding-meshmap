import { dateTimeType, primaryKeyType } from '#helpers/migration-helper'
import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreatePartnerMessageTable1755851155294 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'partner_messages',
        columns: [
          {
            name: 'id',
            type: primaryKeyType(queryRunner),
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'subject',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'message',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'created_at',
            ...dateTimeType(),
            isNullable: false,
            default: queryRunner.connection.driver.mappedDataTypes.createDateDefault,
          },
          {
            name: 'updated_at',
            ...dateTimeType(),
            isNullable: false,
            default: queryRunner.connection.driver.mappedDataTypes.updateDateDefault,
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('partner_messages')
  }
}
