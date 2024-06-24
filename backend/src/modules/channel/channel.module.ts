import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { UserChannelModule } from '../user_channel/user_channel.module';
import { ChannelGateway } from './channel.gateway';
import { channelProviders } from './channel.providers';
import { ChannelService } from './channel.service';

@Module({
  imports: [UserModule, UserChannelModule],
  providers: [ChannelGateway, ChannelService, ...channelProviders],
  exports: [ChannelService],
})
export class ChannelModule {}
