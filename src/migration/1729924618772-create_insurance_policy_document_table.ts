import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'
import { createIndices, dateTimeType, dropIndices, primaryKeyType } from '#helpers/migration-helper'

export class CreateInsurancePolicyDocumentTable1729924618772 implements MigrationInterface {
  tableName = 'insurance_policy_documents'
  indices = ['created_at', 'updated_at']
  foreignKey = new TableForeignKey({
    columnNames: ['user_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'users',
    onDelete: 'CASCADE',
  })

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: primaryKeyType(queryRunner),
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'document',
            type: 'bytea',
            isNullable: false,
          },
          {
            name: 'extension',
            type: 'text',
            isNullable: false,
          },

          { name: 'validity_start', type: 'date', isNullable: false },
          { name: 'validity_end', type: 'date', isNullable: false },

          { name: 'provider', type: 'text', isNullable: false },
          { name: 'policy_number', type: 'text', isNullable: false },
          { name: 'contact_phone', type: 'text', isNullable: false },
          {
            name: 'user_id',
            type: primaryKeyType(queryRunner),
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
    await createIndices(queryRunner, this.tableName, this.indices)
    await queryRunner.createForeignKey(this.tableName, this.foreignKey)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(this.tableName, this.foreignKey)
    await dropIndices(queryRunner, this.tableName, this.indices)
    await queryRunner.dropTable(this.tableName)
  }
}
