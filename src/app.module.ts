import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { CONFIG_MODULE_SETTINGS } from './constants/app-module.constant';
import { MySql_TypeOrm } from './database/data-source';

@Module({
  imports: [ConfigModule.forRoot(CONFIG_MODULE_SETTINGS), MySql_TypeOrm],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
