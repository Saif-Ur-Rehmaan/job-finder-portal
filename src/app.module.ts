import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CONFIG_MODULE_SETTINGS } from './constants/config-module-settings.constant';

@Module({
  imports: [ConfigModule.forRoot(CONFIG_MODULE_SETTINGS)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
