import { Provider } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/core/constants';
import { User } from 'src/core/models/user.entity';

export const userProviders: Provider[] = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
];
