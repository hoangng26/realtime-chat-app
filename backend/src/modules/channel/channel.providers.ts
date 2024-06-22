import { Provider } from '@nestjs/common';
import { CHANNEL_REPOSITORY } from 'src/core/constants';
import { Channel } from 'src/core/models/channel.entity';

export const channelProviders: Provider[] = [
  {
    provide: CHANNEL_REPOSITORY,
    useValue: Channel,
  },
];
