import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import { createIndices, dropIndices, primaryKeyType } from '../helpers/migration-helper.js'

export class CreateServiceEnvelopesTable1719576008087 implements MigrationInterface {
  tableName = 'service_envelopes'
  indices = ['node_id', 'created_at', 'updated_at']

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          { name: 'id', type: primaryKeyType(queryRunner), isPrimary: true, isGenerated: true, generationStrategy: 'increment' },

          { name: 'mqtt_topic', type: 'text', isNullable: false },
          { name: 'channel_id', type: 'text', isNullable: false },
          { name: 'gateway_id', type: 'bigint', isNullable: true },
          { name: 'to', type: 'bigint', isNullable: false },
          { name: 'from', type: 'bigint', isNullable: false },
          { name: 'protobuf', type: 'blob', isNullable: false },

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
