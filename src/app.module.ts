import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { CONFIG_MODULE_SETTINGS } from './constants/app-module.constant';
import DataSource from './database/data-source';

@Module({
  imports: [ConfigModule.forRoot(CONFIG_MODULE_SETTINGS), DataSource],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
