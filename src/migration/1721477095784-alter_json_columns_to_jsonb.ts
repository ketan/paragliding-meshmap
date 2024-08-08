import { MigrationInterface, QueryRunner } from 'typeorm'

export class AlterJsonColumnsToJsonb1721477095784 implements MigrationInterface {
  mapping: Record<string, string[]> = {
    neighbour_infos: ['neighbours'],
    nodes: ['neighbours', 'inbox', 'outbox'],
    traceroutes: ['route'],
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    if (queryRunner.connection.driver.options.type !== 'postgres') {
      return
    }
    for (const table in this.mapping) {
      const columns = this.mapping[table]
      for (let index = 0; index < columns.length; index++) {
        const column = columns[index]
        await queryRunner.query(`ALTER TABLE ${table} ALTER COLUMN ${column} SET DATA TYPE jsonb USING ${column}::jsonb;`)
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    if (queryRunner.connection.driver.options.type !== 'postgres') {
      return
    }

    for (const table in this.mapping) {
      const columns = this.mapping[table]
      for (let index = 0; index < columns.length; index++) {
        const column = columns[index]
        await queryRunner.query(`ALTER TABLE ${table} ALTER COLUMN ${column} SET DATA TYPE json USING ${column}::json;`)
      }
    }
  }
}
