import { Module } from '@nestjs/common';
import { userChannelProviders } from './user_channel.providers';
import { UserChannelService } from './user_channel.service';

@Module({
  providers: [UserChannelService, ...userChannelProviders],
  exports: [UserChannelService],
})
export class UserChannelModule {}
