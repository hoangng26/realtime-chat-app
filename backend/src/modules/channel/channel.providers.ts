import { Provider } from '@nestjs/common';
import { Channel } from 'diagnostics_channel';
import { CHANNEL_REPOSITORY } from 'src/core/constants';

export const channelProviders: Provider[] = [
  {
    provide: CHANNEL_REPOSITORY,
    useValue: Channel,
  },
];
