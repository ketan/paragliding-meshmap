import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import { createIndices, dateTimeType, dropIndices, primaryKeyType } from '#helpers/migration-helper'

export class CreateTextMessagesTable1719576103688 implements MigrationInterface {
  tableName = 'text_messages'
  indices = ['created_at', 'updated_at']

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

          { name: 'channel', type: 'integer', isNullable: false },
          { name: 'channel_id', type: 'text', isNullable: false },
          { name: 'gateway_id', type: 'bigint', isNullable: true },
          { name: 'packet_id', type: 'bigint', isNullable: false },
          { name: 'to', type: 'bigint', isNullable: false },
          { name: 'from', type: 'bigint', isNullable: false },
          { name: 'text', type: 'text', isNullable: false },

          { name: 'want_response', type: 'boolean', isNullable: true },

          { name: 'hop_limit', type: 'integer', isNullable: true },
          { name: 'rx_snr', type: 'double precision', isNullable: true },
          { name: 'rx_rssi', type: 'integer', isNullable: true },
          { name: 'rx_time', type: 'bigint', isNullable: true },

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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await dropIndices(queryRunner, this.tableName, this.indices)
    await queryRunner.dropTable(this.tableName)
  }
}
