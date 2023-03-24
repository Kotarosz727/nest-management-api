import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddKanbanPriority1679658121021 implements MigrationInterface {
  name = 'AddKanbanPriority1679658121021';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`kanbans\`
          ADD \`prioritize\` tinyint NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`kanbans\`
          ADD CONSTRAINT \`FK_4439beb5b47c5de1aecb3853e6f\` FOREIGN KEY (\`userId\`) REFERENCES \`users\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`kanbans\` DROP FOREIGN KEY \`FK_4439beb5b47c5de1aecb3853e6f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`kanbans\` DROP COLUMN \`prioritize\``,
    );
  }
}
