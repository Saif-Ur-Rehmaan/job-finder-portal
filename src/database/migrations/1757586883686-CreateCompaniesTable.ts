import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { DatabaseHelper } from '../databaseHelper';
import { Company } from '../entities/company.entity';

export class CreateCompaniesTable1757586883686 implements MigrationInterface {
  private tableName = 'companies';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: await DatabaseHelper.getDBTableColumns<Company>(Company),
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
