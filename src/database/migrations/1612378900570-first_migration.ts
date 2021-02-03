import {MigrationInterface, QueryRunner} from "typeorm";

export class firstMigration1612378900570 implements MigrationInterface {
    name = 'firstMigration1612378900570'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "places" ("id" SERIAL NOT NULL, "country" character varying(100) NOT NULL, "place" character varying NOT NULL, "goal" integer NOT NULL, "flag" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_00f1632eefe891de925aa224059" UNIQUE ("place"), CONSTRAINT "PK_1afab86e226b4c3bc9a74465c12" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "places"`);
    }

}
