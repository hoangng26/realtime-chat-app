import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { ChatModule } from './modules/chat/chat.module';
import { UserModule } from './modules/user/user.module';
import { ChannelModule } from './modules/channel/channel.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ChatModule, DatabaseModule, UserModule, ChannelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
