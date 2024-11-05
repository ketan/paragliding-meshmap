import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import { createIndices, dateTimeType, dropIndices, primaryKeyType } from '#helpers/migration-helper'

export class CreateUsersTable1729924618769 implements MigrationInterface {
  tableName = 'users'
  indices = ['email', 'created_at', 'updated_at']

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

          { name: 'display_name', type: 'text', isNullable: true },

          {
            name: 'email',
            type: 'text',
            isNullable: false,
            isUnique: true,
          },

          {
            name: 'profile_photo_url',
            type: 'text',
            isNullable: true,
            isUnique: true,
          },

          // phone numbers
          { name: 'primary_phone', type: 'text', isNullable: true },
          { name: 'secondary_phone', type: 'text', isNullable: true },

          // personal details
          { name: 'dob', type: 'date', isNullable: true },
          { name: 'nationality', type: 'text', isNullable: true },
          { name: 'embassy_phone', type: 'text', isNullable: true },

          // glider details
          { name: 'paraglider_1_manufacturer', type: 'text', isNullable: true },
          { name: 'paraglider_1_model', type: 'text', isNullable: true },
          { name: 'paraglider_1_primary_color', type: 'text', isNullable: true },
          { name: 'paraglider_1_secondary_color', type: 'text', isNullable: true },
          { name: 'paraglider_2_manufacturer', type: 'text', isNullable: true },
          { name: 'paraglider_2_model', type: 'text', isNullable: true },
          { name: 'paraglider_2_primary_color', type: 'text', isNullable: true },
          { name: 'paraglider_2_secondary_color', type: 'text', isNullable: true },
          // address
          { name: 'address_1', type: 'text', isNullable: true },
          { name: 'address_2', type: 'text', isNullable: true },
          { name: 'city', type: 'text', isNullable: true },
          { name: 'state', type: 'text', isNullable: true },
          { name: 'postal_code', type: 'text', isNullable: true },
          { name: 'country', type: 'text', isNullable: true },
          // emergency contacts
          { name: 'primary_emergency_contact_name', type: 'text', isNullable: true },
          { name: 'primary_emergency_contact_phone', type: 'text', isNullable: true },
          { name: 'secondary_emergency_contact_name', type: 'text', isNullable: true },
          { name: 'secondary_emergency_contact_phone', type: 'text', isNullable: true },
          // insurace

          // medical
          { name: 'medical_conditions', type: 'text', isNullable: true },
          { name: 'medications', type: 'text', isNullable: true },
          { name: 'allergies', type: 'text', isNullable: true },
          { name: 'blood_group', type: 'text', isNullable: true },
          { name: 'admin', type: 'boolean', isNullable: false, default: false },

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

    await queryRunner.query(`CREATE UNIQUE INDEX "uq_case_insensitive_email" ON "${this.tableName}" (LOWER("email"));`)
    await createIndices(queryRunner, this.tableName, this.indices)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await dropIndices(queryRunner, this.tableName, this.indices)
    await queryRunner.dropTable(this.tableName)
  }
}
