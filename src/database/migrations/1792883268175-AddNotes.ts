import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNotes1792883268175 implements MigrationInterface {
    name = 'AddNotes1792883268175'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`notes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`body\` text NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`folderId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`folders\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`notes\` ADD CONSTRAINT \`FK_15b6167f4f03b7fa7cc54fa3d79\` FOREIGN KEY (\`folderId\`) REFERENCES \`folders\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`folders\` ADD CONSTRAINT \`FK_5caa05c855e82b975c8c438cf68\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`folders\` DROP FOREIGN KEY \`FK_5caa05c855e82b975c8c438cf68\``);
        await queryRunner.query(`ALTER TABLE \`notes\` DROP FOREIGN KEY \`FK_15b6167f4f03b7fa7cc54fa3d79\``);
        await queryRunner.query(`ALTER TABLE \`folders\` DROP COLUMN \`userId\``);
        await queryRunner.query(`DROP TABLE \`notes\``);
    }

}
