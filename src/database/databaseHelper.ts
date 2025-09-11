import { DataSource, EntityMetadata, EntityTarget, TableColumn } from 'typeorm';
import { MySql_DataSource } from './data-source';
export class DatabaseHelper {
  private static dataSource: DataSource = MySql_DataSource;
  private static async initDataSource(): Promise<DataSource> {
    if (!this.dataSource || !this.dataSource.isInitialized) {
      await this.dataSource.initialize();
    }
    return this.dataSource;
  }
  public static async getDBTableColumns<T>(entity: EntityTarget<T>) {
    const ds = await this.initDataSource();
    const metaData: EntityMetadata = ds.getMetadata(entity);
    const isUnique = (colName: string): boolean => {
      return metaData.uniques.some(
        (uniqueColumn) => uniqueColumn.name === colName,
      );
    };
    const tableColumns: TableColumn[] = metaData.columns.map(
      (column): TableColumn =>
        new TableColumn({
          name: column.databaseName,
          type: column.type as TableColumn['type'],
          isNullable: column.isNullable,
          isGenerated: column.isGenerated,
          isPrimary: column.isPrimary,
          isUnique: isUnique(column.databaseName) ?? false,
          isArray: column.isArray,
          length: column.length,
          zerofill: column.zerofill,
          unsigned: column.unsigned,
        }),
    );
    return tableColumns;
  }
}
