import { Module } from '@nestjs/common';
import { ChannelGateway } from './channel.gateway';
import { channelProviders } from './channel.providers';
import { ChannelService } from './channel.service';

@Module({
  providers: [ChannelGateway, ChannelService, ...channelProviders],
  exports: [ChannelService],
})
export class ChannelModule {}
