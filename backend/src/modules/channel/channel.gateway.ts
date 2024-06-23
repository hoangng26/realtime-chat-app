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
import { UserChannelDto } from 'src/core/dtos/user_channel.dto';
import { User_Channel } from 'src/core/models/user_channel.entity';
import { UserChannelService } from '../user_channel/user_channel.service';
import { ChannelService } from './channel.service';

@WebSocketGateway()
export class ChannelGateway {
  constructor(
    private readonly channelService: ChannelService,
    private readonly userChannelService: UserChannelService,
  ) {}

  @WebSocketServer()
  private readonly io: Server;

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
  async join(@ConnectedSocket() client: Socket, @MessageBody() userChannelDto: UserChannelDto) {
    const { channelId } = userChannelDto;

    let data: User_Channel;
    data = await this.userChannelService.findOne(userChannelDto);
    if (!data) {
      data = await this.userChannelService.create(userChannelDto);
    }

    client.join(`room-${channelId}`);
    this.io.in(`room-${channelId}`).emit(CHANNEL_EVENTS.JOIN, {
      data,
      joinedTime: Date.now(),
    });
  }
}
