---

# JobSeekerPortal – NestJS + Knex + MySQL

## 📌 Overview

This project uses **NestJS**, **Knex.js**, and **MySQL** with a **database-first approach**.
Configuration is handled via `@nestjs/config`, which loads environment variables from `.env` files or OS shell exports.

---

## ⚙️ Environment Configuration Flow

1. **Env Files (`development.env`, `production.env`, etc.)**

   * Contain database credentials and app settings.
   * Example `development.env`:

     ```env
     MYSQL_DB_HOST=localhost
     MYSQL_DB_PORT=3306
     MYSQL_DB_USERNAME=root
     MYSQL_DB_PASSWORD=secret
     MYSQL_DB_NAME=job_portal
     ```

2. **ConfigModule Setup (`app.module.ts`)**

   * Loads env file and registers configs globally.

   ```ts
   @Module({
     imports: [
       ConfigModule.forRoot({
         isGlobal: true,
         envFilePath: 'development.env',
         load: [databaseConfig],
       }),
     ],
   })
   export class AppModule {}
   ```

3. **Database Config (`database.config.ts`)**

   * Defines how environment variables are mapped to database settings.
   * Uses `registerAs` for type-safe, namespaced configs.

   ```ts
   import { registerAs } from '@nestjs/config';

   export default registerAs('database', () => ({
     mysql: {
       host: process.env.MYSQL_DB_HOST,
       port: parseInt(process.env.MYSQL_DB_PORT as string, 10) || 3306,
       username: process.env.MYSQL_DB_USERNAME,
       password: process.env.MYSQL_DB_PASSWORD,
       database: process.env.MYSQL_DB_NAME,
     },
   }));
   ```

4. **Service/Provider Usage**

   * Inject config where needed instead of using `process.env` directly.
   * Example:

     ```ts
     import { Injectable, Inject } from '@nestjs/common';
     import { ConfigType } from '@nestjs/config';
     import databaseConfig from './config/database.config';

     @Injectable()
     export class DbService {
       constructor(
         @Inject(databaseConfig.KEY)
         private dbConfig: ConfigType<typeof databaseConfig>,
       ) {}

       getDbHost() {
         return this.dbConfig.mysql.host; // → "localhost"
       }
     }
     ```

5. **Knex Provider**

   * Uses injected config to create a MySQL connection pool.

   ```ts
   import { Provider } from '@nestjs/common';
   import { Knex, knex } from 'knex';
   import databaseConfig from './config/database.config';
   import { ConfigType } from '@nestjs/config';

   export const KNEX_CONNECTION = 'KNEX_CONNECTION';

   export const DbProvider: Provider = {
     provide: KNEX_CONNECTION,
     inject: [databaseConfig.KEY],
     useFactory: (dbConfig: ConfigType<typeof databaseConfig>) => {
       return knex({
         client: 'mysql2',
         connection: {
           host: dbConfig.mysql.host,
           port: dbConfig.mysql.port,
           user: dbConfig.mysql.username,
           password: dbConfig.mysql.password,
           database: dbConfig.mysql.database,
         },
       });
     },
   };
   ```

---

## 🔄 Flow Summary

1. **Runtime loads env file** (`development.env`).
2. **ConfigModule** injects variables into `process.env`.
3. **database.config.ts** maps `process.env` → `database.mysql` config.
4. **DbProvider** builds Knex instance using injected config.
5. **Services/Controllers** use `KNEX_CONNECTION` or `ConfigService` to query DB.

---

## 🛠 Switching Environments

* Use different env files:

  * `development.env`
  * `production.env`
  * `test.env`

* Switch automatically with `NODE_ENV`:

  ```ts
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: `${process.env.NODE_ENV}.env`,
    load: [databaseConfig],
  });
  ```

Run like:

```bash
NODE_ENV=development npm run start:dev
NODE_ENV=production npm run start:prod
```

---

✅ With this setup, your app cleanly separates **env variables → config mapping → providers → services**.

---