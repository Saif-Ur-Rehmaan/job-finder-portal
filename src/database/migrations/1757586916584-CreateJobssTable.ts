import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { DatabaseHelper } from '../databaseHelper';
import { Job } from '../entities/Job.entity';

export class CreateJobssTable1757586916584 implements MigrationInterface {
  private tableName = 'jobs';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: DatabaseHelper.getDBTableColumns<Job>(Job, queryRunner),
      }),
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
