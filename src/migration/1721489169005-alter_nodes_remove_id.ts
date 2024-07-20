import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterNodesRemoveId1721489169005 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('nodes', 'id')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
