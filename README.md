## Start Project

- windows powershell: `$env:NODE_ENV="development" && npx run start:dev`
- windows cmd: `set NODE_ENV="development" && npx run start:dev`
- windows cmd: `set NODE_ENV="development" && npx run start:dev`

## run migration

`npx typeorm-ts-node-commonjs migration:run -d ./src/database/data-source.ts`

## Notes on Comments and Docs

Most comments were written with GPT’s help — I explained what they should describe, and GPT rephrased them clearly in English.

## 📂 Database Schema

For full details of the database schema, see [database.md](./docs/database-config.md).

## 📘 Database helper & Migrations

For a detailed explanation of how migrations work with `DatabaseHelper`,
see [database-migrations-helpers.md](./docs/database-migrations-helpers.md).
