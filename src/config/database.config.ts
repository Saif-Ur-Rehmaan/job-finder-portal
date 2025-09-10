import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  mysql: {
    name: 'mysql',
    host: process.env.MYSQL_DB_HOST,
    port: parseInt(process.env.MYSQL_DB_PORT as string, 10) || 3306,
    username: process.env.MYSQL_DB_USERNAME,
    password: process.env.MYSQL_DB_PASSWORD,
    database: process.env.MYSQL_DB_NAME,
  },
}));
