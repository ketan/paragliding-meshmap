import { MigrationInterface, QueryRunner } from 'typeorm'

export class PopulateLocationsTable1731246653390 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection.query(`INSERT INTO "locations" ("location")
                                        VALUES ('Kamshet'),
                                               ('Bir')`)
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
    //  do nothing
  }
}
