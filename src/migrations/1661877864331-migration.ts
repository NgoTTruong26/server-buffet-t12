import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1661877864331 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE 'posts' ADD 'id' varchar(36) NOT NULL PRIMARY KEY`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE 'posts' DROP COLUMN 'id'`);
  }
}
