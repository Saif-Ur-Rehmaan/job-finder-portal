import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { User } from '../entities/user.entity';
import { DatabaseHelper } from '../databaseHelper';

export class CreateUsersTable1757586860099 implements MigrationInterface {
  private tableName = 'users';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: await DatabaseHelper.getDBTableColumns<User>(User),
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
