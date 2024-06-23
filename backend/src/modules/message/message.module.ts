import { Module } from '@nestjs/common';
import { MessageGateway } from './message.gateway';
import { messageProviders } from './message.providers';
import { MessageService } from './message.service';

@Module({
  providers: [MessageGateway, MessageService, ...messageProviders],
  exports: [MessageService],
})
export class MessageModule {}
