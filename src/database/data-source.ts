import { DataSource } from 'typeorm';
import databaseConfig from '../config/database.config';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config({ path: 'development.env' });
// create database if not exist
const createMySQLDataSource = async () => {
  const connection = await mysql.createConnection({
    host: databaseConfig().mysql.host,
    port: parseInt(String(databaseConfig().mysql.port), 10),
    user: databaseConfig().mysql.username,
    password: databaseConfig().mysql.password,
  });
  await connection.query(
    `CREATE DATABASE IF NOT EXISTS  ${databaseConfig().mysql.database}  `,
  );
  await connection.end();
  const MySql_DataSource = new DataSource({
    type: 'mysql',
    host: databaseConfig().mysql.host,
    port: parseInt(String(databaseConfig().mysql.port), 10),
    username: databaseConfig().mysql.username,
    password: databaseConfig().mysql.password,
    database: databaseConfig().mysql.database,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
  });
  return MySql_DataSource;
};
const AppDataSource = createMySQLDataSource();
export default AppDataSource;
