import { MessageBody, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { CHANNEL_EVENTS } from 'src/core/constants';
import { ChannelDto } from 'src/core/dtos/channel.dto';
import { ChannelService } from './channel.service';

@WebSocketGateway()
export class ChannelGateway {
  constructor(private readonly channelService: ChannelService) {}

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
}
