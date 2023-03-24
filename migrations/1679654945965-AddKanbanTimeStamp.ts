import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddKanbanTimeStamp1679654945965 implements MigrationInterface {
  name = 'AddKanbanTimeStamp1679654945965';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`kanbans\`
            ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    await queryRunner.query(`ALTER TABLE \`kanbans\`
            ADD \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    await queryRunner.query(
      `ALTER TABLE \`kanbans\` DROP FOREIGN KEY \`FK_4439beb5b47c5de1aecb3853e6f\``,
    );
    await queryRunner.query(`ALTER TABLE \`kanbans\` DROP COLUMN \`userId\``);
    await queryRunner.query(`ALTER TABLE \`kanbans\`
            ADD \`userId\` varchar(255) NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`kanbans\`
            ADD CONSTRAINT \`FK_4439beb5b47c5de1aecb3853e6f\` FOREIGN KEY (\`userId\`) REFERENCES \`users\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`kanbans\` DROP FOREIGN KEY \`FK_4439beb5b47c5de1aecb3853e6f\``,
    );
    await queryRunner.query(`ALTER TABLE \`kanbans\` DROP COLUMN \`userId\``);
    await queryRunner.query(`ALTER TABLE \`kanbans\`
            ADD \`userId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`kanbans\`
            ADD CONSTRAINT \`FK_4439beb5b47c5de1aecb3853e6f\` FOREIGN KEY (\`userId\`) REFERENCES \`users\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(
      `ALTER TABLE \`kanbans\` DROP COLUMN \`updated_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`kanbans\` DROP COLUMN \`created_at\``,
    );
  }
}
