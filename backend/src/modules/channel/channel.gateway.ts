import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CHANNEL_EVENTS } from 'src/core/constants';
import { ChannelDto } from 'src/core/dtos/channel.dto';
import { User } from 'src/core/models/user.entity';
import { User_Channel } from 'src/core/models/user_channel.entity';
import { UserService } from '../user/user.service';
import { UserChannelService } from '../user_channel/user_channel.service';
import { ChannelService } from './channel.service';

@WebSocketGateway()
export class ChannelGateway {
  constructor(
    private readonly channelService: ChannelService,
    private readonly userService: UserService,
    private readonly userChannelService: UserChannelService,
  ) {}

  @WebSocketServer()
  private readonly io: Server;

  private readonly logger = new Logger(ChannelGateway.name);

  @SubscribeMessage(CHANNEL_EVENTS.CREATE)
  async create(@MessageBody() channelDto: ChannelDto) {
    const data = await this.channelService.create(channelDto);

    return <WsResponse>{
      event: CHANNEL_EVENTS.CREATE,
      data,
    };
  }

  @SubscribeMessage(CHANNEL_EVENTS.FIND_ALL)
  async findAll() {
    const data = await this.channelService.findAll();

    return <WsResponse>{
      event: CHANNEL_EVENTS.FIND_ALL,
      data,
    };
  }

  @SubscribeMessage(CHANNEL_EVENTS.FIND_ONE)
  async findOne(@MessageBody() id: number) {
    const data = await this.channelService.findOne(id);

    return <WsResponse>{
      event: CHANNEL_EVENTS.FIND_ONE,
      data,
    };
  }

  @SubscribeMessage(CHANNEL_EVENTS.FIND_MANY)
  async findMany(@MessageBody() query: string) {
    const data = await this.channelService.findMany(query);

    return <WsResponse>{
      event: CHANNEL_EVENTS.FIND_MANY,
      data,
    };
  }

  @SubscribeMessage(CHANNEL_EVENTS.JOIN)
  async join(@ConnectedSocket() client: Socket, @MessageBody() body: any) {
    const { userName, channelId } = body;
    let user: User;
    let data: User_Channel;

    user = (await this.userService.findMany(userName))[0];

    if (!user) {
      user = await this.userService.create({ userName });
      data = await this.userChannelService.create({
        userId: user.id,
        channelId,
      });
    } else {
      data = await this.userChannelService.findOne({
        userId: user.id,
        channelId,
      });

      if (!data) {
        data = await this.userChannelService.create({
          userId: user.id,
          channelId,
        });
      }
    }

    client.join(`channel-${channelId}`);

    this.logger.debug(`User ${userName} with id ${user.id} has join channel ${channelId}`);

    this.io.in(`channel-${channelId}`).emit(CHANNEL_EVENTS.JOIN, {
      data,
      joinedTime: Date.now(),
    });
  }

  @SubscribeMessage(CHANNEL_EVENTS.FIND_USER_CHANNELS)
  async findUserChannels(@MessageBody() userName: string) {
    const user: User = (await this.userService.findMany(userName))[0];
    const data = await this.userChannelService.findAllJoinedChannelOfUser(user.id);

    return <WsResponse>{
      event: CHANNEL_EVENTS.FIND_USER_CHANNELS,
      data,
    };
  }
}
