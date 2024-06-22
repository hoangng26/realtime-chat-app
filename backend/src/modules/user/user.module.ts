import { Module } from '@nestjs/common';
import { UserGateway } from './user.gateway';
import { userProviders } from './user.providers';
import { UserService } from './user.service';

@Module({
  providers: [UserGateway, UserService, ...userProviders],
  exports: [UserService],
})
export class UserModule {}
