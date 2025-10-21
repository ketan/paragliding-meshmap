import { MigrationInterface, QueryRunner } from 'typeorm'

export class FixupNeighbourInfosPartitioning1761025434880 implements MigrationInterface {
  name = 'FixupNeighbourInfosPartitioning1761025434880'

  public async up(queryRunner: QueryRunner): Promise<void> {
    const tableName = 'neighbour_infos'
    await queryRunner.query(`ALTER SEQUENCE IF EXISTS ${tableName}_id_seq OWNED BY ${tableName}.id;`)
    await queryRunner.query(`DROP TABLE IF EXISTS ${tableName}_original;`)
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {}
}
