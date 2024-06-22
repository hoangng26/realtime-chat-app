import { WebSocketGateway } from '@nestjs/websockets';
import { ChannelService } from './channel.service';

@WebSocketGateway()
export class ChannelGateway {
  constructor(private readonly channelService: ChannelService) {}
}
