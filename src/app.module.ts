import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HealthController} from './health.controller'
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AppController,HealthController],
  providers: [AppService],
})
export class AppModule {}
