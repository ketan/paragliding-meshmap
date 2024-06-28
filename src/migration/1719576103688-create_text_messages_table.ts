import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import { createIndices, dropIndices, primaryKeyType } from '../helpers/migration-helper.js'

export class CreateTextMessagesTable1719576103688 implements MigrationInterface {
  tableName = 'text_messages'
  indices = ['node_id', 'created_at', 'updated_at']

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          { name: 'id', type: primaryKeyType(queryRunner), isPrimary: true, isGenerated: true, generationStrategy: 'increment' },

          { name: 'channel', type: 'integer', isNullable: true },
          { name: 'channel_id', type: 'text', isNullable: true },
          { name: 'gateway_id', type: 'bigint', isNullable: true },
          { name: 'packet_id', type: 'bigint', isNullable: true },
          { name: 'from', type: 'bigint', isNullable: false },
          { name: 'to', type: 'bigint', isNullable: false },
          { name: 'want_response', type: 'integer', isNullable: false },

          { name: 'hop_limit', type: 'integer', isNullable: true },
          { name: 'rx_snr', type: 'float', isNullable: true },
          { name: 'rx_rssi', type: 'integer', isNullable: true },
          { name: 'rx_time', type: 'bigint', isNullable: true },
          { name: 'text', type: 'text', isNullable: false },

          { name: 'created_at', type: 'datetime', isNullable: false },
          { name: 'updated_at', type: 'datetime', isNullable: false },
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
