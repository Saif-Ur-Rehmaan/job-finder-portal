import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { DatabaseHelper } from '../../app/helpers/databaseHelper';
import { Company } from '../entities/company.entity';

export class CreateCompaniesTable1757586883686 implements MigrationInterface {
  private tableName = 'companies';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: DatabaseHelper.getDBTableColumns<Company>(
          Company,
          queryRunner,
        ),
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
