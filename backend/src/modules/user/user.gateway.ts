import { MessageBody, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { USER_EVENTS } from 'src/core/constants';
import { UpdateUserDto, UserDto } from 'src/core/dtos/user.dto';
import { UserService } from './user.service';

@WebSocketGateway()
export class UserGateway {
  constructor(private readonly userService: UserService) {}

  @SubscribeMessage(USER_EVENTS.CREATE)
  async create(@MessageBody() userDto: UserDto) {
    const data = await this.userService.create(userDto);

    return <WsResponse>{
      event: USER_EVENTS.CREATE,
      data,
    };
  }

  @SubscribeMessage(USER_EVENTS.FIND_ALL)
  async findAll() {
    const data = await this.userService.findAll();

    return <WsResponse>{
      event: USER_EVENTS.FIND_ALL,
      data,
    };
  }

  @SubscribeMessage(USER_EVENTS.FIND_ONE)
  async findOne(@MessageBody() id: number) {
    const data = await this.userService.findOne(id);

    return <WsResponse>{
      event: USER_EVENTS.FIND_ONE,
      data,
    };
  }

  @SubscribeMessage(USER_EVENTS.FIND_MANY)
  async findMany(@MessageBody() query: string) {
    const data = await this.userService.findMany(query);

    return <WsResponse>{
      event: USER_EVENTS.FIND_MANY,
      data,
    };
  }

  @SubscribeMessage(USER_EVENTS.UPDATE)
  async update(@MessageBody() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto.id, updateUserDto);
  }

  @SubscribeMessage(USER_EVENTS.REMOVE)
  remove(@MessageBody() id: number) {
    return this.userService.remove(id);
  }
}
