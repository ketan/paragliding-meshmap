import { MigrationInterface, QueryRunner } from 'typeorm'

export class ChangePowerMetricColumnNames1721306194413 implements MigrationInterface {
  tableName = 'power_metrics'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn(this.tableName, 'ch1_voltage', 'ch_1_voltage')
    await queryRunner.renameColumn(this.tableName, 'ch2_voltage', 'ch_2_voltage')
    await queryRunner.renameColumn(this.tableName, 'ch3_voltage', 'ch_3_voltage')

    await queryRunner.renameColumn(this.tableName, 'ch1_current', 'ch_1_current')
    await queryRunner.renameColumn(this.tableName, 'ch2_current', 'ch_2_current')
    await queryRunner.renameColumn(this.tableName, 'ch3_current', 'ch_3_current')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn(this.tableName, 'ch_1_voltage', 'ch1_voltage')
    await queryRunner.renameColumn(this.tableName, 'ch_2_voltage', 'ch2_voltage')
    await queryRunner.renameColumn(this.tableName, 'ch_3_voltage', 'ch3_voltage')

    await queryRunner.renameColumn(this.tableName, 'ch_1_current', 'ch1_current')
    await queryRunner.renameColumn(this.tableName, 'ch_2_current', 'ch2_current')
    await queryRunner.renameColumn(this.tableName, 'ch_3_current', 'ch3_current')
  }
}
