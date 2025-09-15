import {
  EntityMetadata,
  EntityTarget,
  TableColumn,
  QueryRunner,
} from 'typeorm';
export class DatabaseHelper {
  public static getDBTableColumns<T>(
    entity: EntityTarget<T>,
    queryRunner: QueryRunner,
  ) {
    const ds = queryRunner.connection;
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
          type: DatabaseHelper.normalizedType(column.type),
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
  static normalizedType(type: unknown): string {
    let columnType: string;

    if (typeof type === 'string') {
      columnType = type;
    } else {
      columnType = 'varchar';
    }
    if (typeof type === 'function') {
      switch (type) {
        case Number:
          columnType = 'int';
          break;
        case String:
          columnType = 'varchar';
          break;
        case Date:
          columnType = 'datetime';
          break;
        case Boolean:
          columnType = 'tinyint';
          break;
        default:
          columnType = 'varchar'; // fallback
      }
      // map function constructors to SQL types
    }
    return columnType;
  }
}
