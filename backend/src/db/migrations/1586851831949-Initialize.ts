import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialize1586851831949 implements MigrationInterface {
    name = 'Initialize1586851831949'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `message` (`id` int NOT NULL AUTO_INCREMENT, `text` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `message`", undefined);
    }

}
