import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import { createIndices, dateTimeType, dropIndices, jsonType, primaryKeyType } from '#helpers/migration-helper'

export class CreateNeighbourInfosTable1719575290714 implements MigrationInterface {
  tableName = 'neighbour_infos'
  indices = ['node_id', 'created_at', 'updated_at']

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

          { name: 'node_id', type: 'bigint', isNullable: false },

          { name: 'node_broadcast_interval_secs', type: 'integer', isNullable: false },
          { name: 'neighbours', type: jsonType(), isNullable: true },

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
