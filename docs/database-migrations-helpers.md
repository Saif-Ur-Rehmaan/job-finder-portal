---
# 📘 Database & Migrations Guide

## ⚡ Overview

This project uses **TypeORM with MySQL** for database access.
Migrations are written in a way that **automatically maps entity definitions to table columns** using a helper function (`DatabaseHelper`).

This ensures your migrations stay in sync with your entity models.
---

## 🚀 DataSource Configuration

The `DataSource` is configured in `database/data-source.ts`:

```ts
const MySql_DataSource = new DataSource({
  type: 'mysql',
  database: databaseConfig().mysql.name,
  host: databaseConfig().mysql.host,
  port: databaseConfig().mysql.port,
  username: databaseConfig().mysql.username,
  password: databaseConfig().mysql.password,
});;
```

---

## 🛠️ DatabaseHelper

`DatabaseHelper` provides a static method `getDBTableColumns` that converts entity metadata into `TableColumn[]`.
This ensures your migrations can be generated automatically from entity definitions.

```ts
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
      // Example: if you don’t include `default` here,
      // default values in your entity won’t appear in the DB
      // default: column.default,
    }),
);
```

### 🔑 Important Note

Whenever you add or update entity properties, ensure the mapping function includes those options.
Otherwise, migrations won’t fully match your entity.

**Example:**

```ts
@Column({ type: 'boolean', default: true })
isActive: boolean;
```

If `default` isn’t mapped in `getDBTableColumns`, the column will be created **without the default value**.

👉 Always keep `DatabaseHelper.getDBTableColumns` in sync with your entity definitions.

---

## 📂 Example Migration

Here’s how a migration uses the helper to create a table:

```ts
export class CreateJobsTable1757586916584 implements MigrationInterface {
  private tableName = 'jobs';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: await DatabaseHelper.getDBTableColumns<Job>(Job),
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
```

### 🔎 How it works

1. Migration calls `DatabaseHelper.getDBTableColumns(Job)`.
2. This function loads `Job`’s metadata from TypeORM.
3. Metadata is mapped into `TableColumn[]`.
4. `queryRunner.createTable` builds the table based on those columns.

Result: Your table schema is **directly generated from the entity definition**.

---

## 🏃 Running Migrations


```bash
# Generate a new migration (timestamped file)
npx typeorm migration:generate -n CreateJobsTable

# Run all pending migrations
npx typeorm migration:run

# Revert last migration
npx typeorm migration:revert
```

---

## To Be Noted

- Always create migrations when you change entities.
- Double-check that new entity properties are mapped in `DatabaseHelper.getDBTableColumns`.
- Never manually edit migration files after running them, unless necessary.

---
