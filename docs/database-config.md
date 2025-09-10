---

# JobSeekerPortal – ( ENV Config + Db Config Flow ) NestJS + TypeORM + MySQL

## Overview

NestJS app using **TypeORM** and **MySQL**.
Env/config setup is **modular**, with global configs (`appConfig`, `authConfig`) and module-specific configs (e.g., `databaseConfig`) loaded only where needed.

---

## Environment & Config

### 1. Env Files

Define your environment in files like:

```env
# development.env
NODE_ENV=development
APP_NAME=JobSeekerPortal
APP_PORT=4000
APP_PREFIX=api
APP_VERSION=1.0.0
APP_URL=jobseekerportal.com
SUPPORT_EMAIL=support@${APP_URL}
MYSQL_DB_HOST=localhost
MYSQL_DB_PORT=3306
MYSQL_DB_USERNAME=root
MYSQL_DB_PASSWORD=
MYSQL_DB_NAME=JobFinderPortal_db
```

### 2. Global Config (`CONFIG_MODULE_SETTINGS`)

```ts
import appConfig from 'src/config/app.config';
import authConfig from 'src/config/auth.config';
import Joi from 'joi';
import { ConfigModuleOptions } from '@nestjs/config';

const validationSchema: ConfigModuleOptions['validationSchema'] = Joi.object({
  NODE_ENV: Joi.string().valid('development','production','test','provision').default('development'),
  APP_NAME: Joi.string().required().default('JobSeekerPortal'),
  APP_PORT: Joi.number().port().default(3000),
  APP_PREFIX: Joi.string().required(),
  APP_VERSION: Joi.string().required(),
  MYSQL_DB_HOST: Joi.string().required(),
  MYSQL_DB_PORT: Joi.number().required(),
  MYSQL_DB_USERNAME: Joi.string().required(),
  MYSQL_DB_PASSWORD: Joi.string().allow('').optional(),
  MYSQL_DB_NAME: Joi.string().required(),
});

export const CONFIG_MODULE_SETTINGS: ConfigModuleOptions = {
  isGlobal: true,
  validationSchema: validationSchema as Joi.ObjectSchema,
  validationOptions: { allowUnknown: false, abortEarly: true },
  expandVariables: true, // allows e.g., SUPPORT_EMAIL=support@${APP_URL}
  envFilePath: `${process.env.NODE_ENV}.env`, // loads env based on NODE_ENV
  load: [appConfig, authConfig], // global configs
};
```

* **Global configs** (`appConfig`, `authConfig`) → available app-wide.
* **Module-specific configs** (`databaseConfig`) → use `ConfigModule.forFeature()` inside relevant modules.

---

### 3. TypeORM Data Source (`data-source.ts`)

```ts
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from 'src/config/database.config';
// You can define multiple data sources and switch or modify them whenever needed
const MySql_TypeOrm = TypeOrmModule.forRootAsync({
  imports: [ConfigModule.forFeature(databaseConfig)],
  inject: [databaseConfig.KEY],
  useFactory: (config: ConfigType<typeof databaseConfig>) => ({
    type: 'mysql',
    host: config.mysql.host,
    port: config.mysql.port,
    username: config.mysql.username,
    password: config.mysql.password,
    database: config.mysql.name,
    entities: [`${__dirname}/entities/*.entity.ts`],
    synchronize: true, // disable in production
  }),
});

const DataSource = MySql_TypeOrm;
export default DataSource;
```

* Flexible: can define **multiple DB sources** and switch whenever needed.

---

## Usage in App Module

```ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CONFIG_MODULE_SETTINGS } from './constants/app-module.constant';
import DataSource from './database/data-source';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot(CONFIG_MODULE_SETTINGS), DataSource],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

* 2/3 configs are global; DB config is only imported where needed.

---

## Summary

* **Env → Global Config → Module Config → TypeORM**.
* Type-safe, modular, and ready for multiple data sources.
* Switch envs easily using `NODE_ENV=development|production|test npm run start`.

---

