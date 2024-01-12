import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1705097172501 implements MigrationInterface {
  name = 'Migrations1705097172501';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`User\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`Password\` varchar(255) NOT NULL, \`Email\` varchar(255) NOT NULL, \`dateOfBirth\` timestamp NOT NULL, \`source\` enum ('youtube', 'google', 'tv', 'by_user') NOT NULL DEFAULT 'google', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_29a05908a0fa0728526d283365\` (\`username\`), UNIQUE INDEX \`IDX_2f56f7040c2b05fc8f08a113f7\` (\`Email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`Referrer\` (\`user_id\` int NOT NULL, \`points\` int NOT NULL DEFAULT '0', PRIMARY KEY (\`user_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`Referral\` (\`referral_id\` int NOT NULL, \`referee_id\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), INDEX \`IDX_3de8e8c8255efac80f6dc1c24b\` (\`referral_id\`), PRIMARY KEY (\`referral_id\`, \`referee_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Referrer\` ADD CONSTRAINT \`FK_71e569f6df5d52a58bcf17eb33f\` FOREIGN KEY (\`user_id\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Referral\` ADD CONSTRAINT \`FK_3de8e8c8255efac80f6dc1c24b0\` FOREIGN KEY (\`referral_id\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Referral\` ADD CONSTRAINT \`FK_d0e3b29e85a70401f7e0c864137\` FOREIGN KEY (\`referee_id\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`Referral\` DROP FOREIGN KEY \`FK_d0e3b29e85a70401f7e0c864137\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Referral\` DROP FOREIGN KEY \`FK_3de8e8c8255efac80f6dc1c24b0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Referrer\` DROP FOREIGN KEY \`FK_71e569f6df5d52a58bcf17eb33f\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_3de8e8c8255efac80f6dc1c24b\` ON \`Referral\``,
    );
    await queryRunner.query(`DROP TABLE \`Referral\``);
    await queryRunner.query(`DROP TABLE \`Referrer\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_2f56f7040c2b05fc8f08a113f7\` ON \`User\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_29a05908a0fa0728526d283365\` ON \`User\``,
    );
    await queryRunner.query(`DROP TABLE \`User\``);
  }
}
