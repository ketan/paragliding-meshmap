import { makeColumnNonNullable, makeColumnNullable } from '#helpers/migration-helper'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class MakeNeighbourInfosNodeBroadcastIntervalSecsNullable1721457864865 implements MigrationInterface {
  tableName = 'neighbour_infos'
  columns = ['node_broadcast_interval_secs']

  public async up(queryRunner: QueryRunner): Promise<void> {
    await makeColumnNullable(queryRunner, this.tableName, this.columns)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await makeColumnNonNullable(queryRunner, this.tableName, this.columns)
  }
}
