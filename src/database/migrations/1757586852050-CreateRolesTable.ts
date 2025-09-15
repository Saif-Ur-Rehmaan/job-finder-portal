import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { DatabaseHelper } from '../databaseHelper';
import { Role } from '../entities/role.entity';

export class CreateRolesTable1757586852050 implements MigrationInterface {
  private tableName = 'roles';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: DatabaseHelper.getDBTableColumns<Role>(Role, queryRunner),
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
