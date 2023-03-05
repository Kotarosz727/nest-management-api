import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateKanban1677982839131 implements MigrationInterface {
  name = 'CreateKanban1677982839131';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`kanbans\`
                                 (
                                     \`id\`          varchar(36)  NOT NULL,
                                     \`name\`        varchar(255) NOT NULL,
                                     \`description\` varchar(255) NOT NULL,
                                     \`status\`      tinyint      NOT NULL,
                                     \`userId\`      varchar(36) NULL,
                                     PRIMARY KEY (\`id\`)
                                 ) ENGINE=InnoDB`);
    await queryRunner.query(`ALTER TABLE \`kanbans\`
            ADD CONSTRAINT \`FK_4439beb5b47c5de1aecb3853e6f\` FOREIGN KEY (\`userId\`) REFERENCES \`users\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`kanbans\` DROP FOREIGN KEY \`FK_4439beb5b47c5de1aecb3853e6f\``,
    );
    await queryRunner.query(`DROP TABLE \`kanbans\``);
  }
}
