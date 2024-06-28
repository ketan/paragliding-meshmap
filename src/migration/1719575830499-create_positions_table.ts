import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import { createIndices, dropIndices, primaryKeyType } from '../helpers/migration-helper.js'

export class CreatePositionsTable1719575830499 implements MigrationInterface {
  tableName = 'positions'
  indices = ['node_id', 'created_at', 'updated_at']

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          { name: 'id', type: primaryKeyType(queryRunner), isPrimary: true, isGenerated: true, generationStrategy: 'increment' },

          { name: 'node_id', type: 'bigint', isNullable: false },

          { name: 'to', type: 'bigint', isNullable: false },
          { name: 'from', type: 'bigint', isNullable: false },

          { name: 'channel', type: 'integer', isNullable: true },
          { name: 'packet_id', type: 'bigint', isNullable: true },
          { name: 'channel_id', type: 'text', isNullable: true },
          { name: 'gateway_id', type: 'bigint', isNullable: true },
          { name: 'latitude', type: 'integer', isNullable: true },
          { name: 'longitude', type: 'integer', isNullable: true },
          { name: 'altitude', type: 'integer', isNullable: true },

          {
            name: 'created_at',
            type: 'datetime',
            isNullable: false,
            default: queryRunner.connection.driver.mappedDataTypes.createDateDefault,
          },
          {
            name: 'updated_at',
            type: 'datetime',
            isNullable: false,
            default: queryRunner.connection.driver.mappedDataTypes.updateDateDefault,
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
