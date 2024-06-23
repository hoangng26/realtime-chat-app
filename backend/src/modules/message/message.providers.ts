import { Provider } from '@nestjs/common';
import { MESSAGE_REPOSITORY } from 'src/core/constants';
import { Message } from 'src/core/models/message.entity';

export const messageProviders: Provider[] = [
  {
    provide: MESSAGE_REPOSITORY,
    useValue: Message,
  },
];
