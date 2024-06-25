import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigrations1719287014590 implements MigrationInterface {
    name = 'NewMigrations1719287014590'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Users" ("UserID" int NOT NULL IDENTITY(1,1), "UserName" nvarchar(255) NOT NULL, "Email" nvarchar(255) NOT NULL, "Password" nvarchar(255) NOT NULL, "createAt" datetime NOT NULL CONSTRAINT "DF_2c77ce562d1932452befab21df4" DEFAULT getdate(), "updateAt" datetime NOT NULL CONSTRAINT "DF_e094ab98134319b432d2bd62321" DEFAULT getdate(), CONSTRAINT "UQ_884fdf47515c24dbbf6d89c2d84" UNIQUE ("Email"), CONSTRAINT "PK_fe45fe4ee5317851eb4746a23d8" PRIMARY KEY ("UserID"))`);
        await queryRunner.query(`CREATE TABLE "Orders" ("OrderID" int NOT NULL IDENTITY(1,1), "OrderDate" datetime NOT NULL CONSTRAINT "DF_cda9d4751803979dd4a0da1f563" DEFAULT getdate(), "CustomerID" int NOT NULL, CONSTRAINT "PK_55f8443f4d79e9a848cf42b69d9" PRIMARY KEY ("OrderID"))`);
        await queryRunner.query(`CREATE TABLE "Customers" ("CustomerID" int NOT NULL IDENTITY(1,1), "FirstName" nvarchar(60) NOT NULL, "LastName" nvarchar(60) NOT NULL, "Email" nvarchar(60), "PhoneNumber" nvarchar(60), CONSTRAINT "PK_20d9e62f5dfe25e72bc90e46257" PRIMARY KEY ("CustomerID"))`);
        await queryRunner.query(`ALTER TABLE "Orders" ADD CONSTRAINT "FK_fcb27b11e453edc543d0a5436eb" FOREIGN KEY ("CustomerID") REFERENCES "Customers"("CustomerID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Orders" DROP CONSTRAINT "FK_fcb27b11e453edc543d0a5436eb"`);
        await queryRunner.query(`DROP TABLE "Customers"`);
        await queryRunner.query(`DROP TABLE "Orders"`);
        await queryRunner.query(`DROP TABLE "Users"`);
    }

}
