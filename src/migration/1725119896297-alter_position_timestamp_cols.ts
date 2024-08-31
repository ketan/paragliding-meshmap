import { MigrationInterface, QueryRunner } from 'typeorm'

export class AlterPositionTimestampCols1725119896297 implements MigrationInterface {
  name = 'AlterPositionTimestampCols1725119896297'

  public async up(queryRunner: QueryRunner): Promise<void> {
    // @formatter:off
    await queryRunner.query(`
        ALTER TABLE "nodes"
          ALTER COLUMN "position_timestamp"
          SET DATA TYPE timestamp(3) with time zone
            USING CASE WHEN "position_timestamp" IS NULL THEN NULL 
            ELSE to_timestamp("position_timestamp" / 1000.0)
          END;
    `)

    await queryRunner.query(`
        ALTER TABLE "positions" 
          ALTER COLUMN "timestamp"
          SET DATA TYPE timestamp(3) with time zone
            USING CASE WHEN "timestamp" IS NULL THEN NULL
            ELSE to_timestamp("timestamp" / 1000.0)
          END`)

    await queryRunner.query(`
        ALTER TABLE "positions" 
          ALTER COLUMN "time"
          SET DATA TYPE timestamp(3) with time zone
            USING CASE WHEN "time" IS NULL THEN NULL
            ELSE to_timestamp ("time" / 1000.0)
          END`)
    // @formatter:on
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // @formatter:off
    await queryRunner.query(`
        ALTER TABLE "nodes" 
          ALTER COLUMN "position_timestamp"
          SET DATA TYPE bigint
            USING CASE WHEN "position_timestamp" IS NULL THEN NULL 
            ELSE extract(epoch from "position_timestamp") * 1000
          END`)

    await queryRunner.query(`
        ALTER TABLE "positions" 
          ALTER COLUMN "timestamp"
          SET DATA TYPE bigint
            USING CASE WHEN "timestamp" IS NULL THEN NULL
            ELSE extract(epoch from "timestamp") * 1000
          END`)

    await queryRunner.query(`
        ALTER TABLE "positions" 
          ALTER COLUMN "time"
          SET DATA TYPE bigint
            USING CASE WHEN "time" IS NULL THEN NULL
            ELSE extract(epoch from "time") * 1000
          END`)
    // @formatter:on
  }
}
