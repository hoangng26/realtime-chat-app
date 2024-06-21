import { Provider } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Channel } from 'src/core/models/channel.entity';
import { Message } from 'src/core/models/message.entity';
import { User } from 'src/core/models/user.entity';
import { User_Channel } from 'src/core/models/user_channel.entity';
import { SEQUELIZE } from '../constants';
import { databaseConfig } from './database.config';

export const databaseProviders: Provider[] = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      const sequelize = new Sequelize(databaseConfig);
      sequelize.addModels([User, Channel, Message, User_Channel]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
