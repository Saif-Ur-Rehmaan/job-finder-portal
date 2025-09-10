import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from 'src/config/database.config';
import { ConfigType } from '@nestjs/config';

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
    entities: [`${__dirname}/entities/*.entity.ts`],
  }),
});

const DataSource = MySql_TypeOrm;
export default DataSource;
