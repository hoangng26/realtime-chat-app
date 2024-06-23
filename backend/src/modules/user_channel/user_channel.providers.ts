import { Provider } from '@nestjs/common';
import { USER_CHANNEL_REPOSITORY } from 'src/core/constants';
import { User_Channel } from 'src/core/models/user_channel.entity';

export const userChannelProviders: Provider[] = [
  {
    provide: USER_CHANNEL_REPOSITORY,
    useValue: User_Channel,
  },
];
