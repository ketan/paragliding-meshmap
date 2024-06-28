import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import { createIndices, dropIndices, primaryKeyType } from '../helpers/migration-helper.js'

export class CreateNeighbourInfosTable1719575290714 implements MigrationInterface {
  tableName = 'neighbour_infos'
  indices = ['node_id', 'created_at', 'updated_at']

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          { name: 'id', type: primaryKeyType(queryRunner), isPrimary: true, isGenerated: true, generationStrategy: 'increment' },

          { name: 'node_id', type: 'bigint', isNullable: false },

          { name: 'node_broadcast_interval_secs', type: 'integer', isNullable: false },
          { name: 'neighbours', type: 'json', isNullable: false },

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
