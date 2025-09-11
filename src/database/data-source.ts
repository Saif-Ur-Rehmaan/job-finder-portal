import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from 'src/config/database.config';
import { ConfigType } from '@nestjs/config';
import { DataSource } from 'typeorm';

// You can define multiple data sources and switch or modify them whenever needed
const MySql_TypeOrm = TypeOrmModule.forRootAsync({
  imports: [ConfigModule.forFeature(databaseConfig)],
  inject: [databaseConfig.KEY],
  useFactory: (config: ConfigType<typeof databaseConfig>) => ({
    type: 'mysql',
    database: config.mysql.name,
    host: config.mysql.host,
    port: config.mysql.port,
    username: config.mysql.username,
    password: config.mysql.password,
    synchronize: false,
    entities: [`${__dirname}/entities/*.entity.ts`],
    migrations: [`${__dirname}/migrations/*.ts`],
  }),
});
const MySql_DataSource = new DataSource({
  type: 'mysql',
  database: databaseConfig().mysql.name,
  host: databaseConfig().mysql.host,
  port: databaseConfig().mysql.port,
  username: databaseConfig().mysql.username,
  password: databaseConfig().mysql.password,
});

export { MySql_TypeOrm };
export { MySql_DataSource };
