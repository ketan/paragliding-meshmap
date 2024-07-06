import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class CreateLastMessageColumnOnNodesTable1720247877418 implements MigrationInterface {
  tableName = 'nodes'
  columns = ['inbox', 'outbox']

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns(
      this.tableName,
      this.columns.map((columnName) => new TableColumn({ name: columnName, type: 'json', isNullable: true }))
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns(this.tableName, this.columns)
  }
}
