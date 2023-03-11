import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPasswordToUser1678495649458 implements MigrationInterface {
  name = 'AddPasswordToUser1678495649458';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\`
            ADD \`password\` varchar(255) NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`password\``);
  }
}
