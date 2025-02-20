import { MigrationInterface, QueryRunner } from 'typeorm';

const users = [
  {
    username: 'admin',
    password: '$2b$10$KfH0fbFjVGUfUQaP8sRVWOccqNd4bkCHlFwMQLHd3Pt5jWt8sMzza',
    role: 'admin',
  },
  {
    username: 'normal',
    password: '$2b$10$OMjJ84nfkEL21IHgDoTzvO0gTNmM3hk3KyDe7uBpGDdxciZZDBvhO',
    role: 'normal',
  },
  {
    username: 'limited',
    password: '$2b$10$EQRn0MPsKzXAmK2LUlS.6.OPIl9UeXFeEfT3sPnXiRSU.c.2HrY.K',
    role: 'limited',
  },
];

export class Migrations1739997999813 implements MigrationInterface {
  name = 'Migrations1739997999813';
  adminUserHashedPassword = '$2b$10$KfH0fbFjVGUfUQaP8sRVWOccqNd4bkCHlFwMQLHd3Pt5jWt8sMzza';
  normalUserHashedPassword = '$2b$10$OMjJ84nfkEL21IHgDoTzvO0gTNmM3hk3KyDe7uBpGDdxciZZDBvhO';
  limitedUserHashedPassword = '$2b$10$EQRn0MPsKzXAmK2LUlS.6.OPIl9UeXFeEfT3sPnXiRSU.c.2HrY.K';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" "public"."role_name_enum" NOT NULL, CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" text NOT NULL, "createdate" TIMESTAMP NOT NULL DEFAULT now(), "updateddate" TIMESTAMP NOT NULL DEFAULT now(), "hach_refresh_token" character varying, "roleId" integer, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_78a916df40e02a9deb1c4b75ed" ON "user" ("username") `);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    users.forEach(async user => {
      await queryRunner.query(`INSERT INTO "role" ("name") VALUES ('${user.role}')`);
      await queryRunner.query(
        `INSERT INTO "user" (username, password, createdate, updateddate, hach_refresh_token, "roleId") VALUES ('${user.username}', '${user.password}', NOW(), NOW(), NULL, (SELECT id FROM "role" WHERE name = '${user.role}'))`,
      );
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_78a916df40e02a9deb1c4b75ed"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "role"`);
  }
}
