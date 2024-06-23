import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { ChannelModule } from './modules/channel/channel.module';
import { ChatModule } from './modules/chat/chat.module';
import { MessageModule } from './modules/message/message.module';
import { UserModule } from './modules/user/user.module';
import { UserChannelModule } from './modules/user_channel/user_channel.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ChatModule,
    DatabaseModule,
    UserModule,
    ChannelModule,
    MessageModule,
    UserChannelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
