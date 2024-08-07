import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import { createIndices, dateTimeType, dropIndices, primaryKeyType } from '#helpers/migration-helper'

export class CreateWaypointsTable1719576284958 implements MigrationInterface {
  tableName = 'waypoints'
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

          { name: 'from', type: 'bigint', isNullable: false },
          { name: 'to', type: 'bigint', isNullable: false },
          { name: 'waypoint_id', type: 'bigint', isNullable: false },
          { name: 'latitude', type: 'integer', isNullable: false },
          { name: 'longitude', type: 'integer', isNullable: false },
          { name: 'expire', type: 'bigint', isNullable: true },
          { name: 'locked_to', type: 'bigint', isNullable: true },
          { name: 'name', type: 'text', isNullable: true },
          { name: 'description', type: 'text', isNullable: true },
          { name: 'icon', type: 'integer', isNullable: true },
          { name: 'channel', type: 'integer', isNullable: false },
          { name: 'packet_id', type: 'bigint', isNullable: false },
          { name: 'channel_id', type: 'text', isNullable: false },
          { name: 'gateway_id', type: 'bigint', isNullable: true },

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
