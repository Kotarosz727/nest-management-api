import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterKanban1678000279381 implements MigrationInterface {
  name = 'AlterKanban1678000279381';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`kanbans\` CHANGE \`status\` \`status\` tinyint NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`kanbans\` CHANGE \`status\` \`status\` tinyint NOT NULL`,
    );
  }
}
