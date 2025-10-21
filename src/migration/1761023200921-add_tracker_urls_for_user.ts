import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddTrackerUrlsForUser1761023200921 implements MigrationInterface {
  name = 'AddTrackerUrlsForUser1761023200921'
  readonly table = 'users'

  readonly columns = [
    new TableColumn({
      name: 'tracker_urls',
      type: 'text',
      isNullable: true,
    }),
  ]

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns(this.table, this.columns)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns(this.table, this.columns)
  }
}
