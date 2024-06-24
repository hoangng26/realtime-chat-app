import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MESSAGE_EVENTS } from 'src/core/constants';
import { MessageDto } from 'src/core/dtos/message.dto';
import { MessageService } from './message.service';

@WebSocketGateway()
export class MessageGateway {
  constructor(private readonly messageService: MessageService) {}

  @WebSocketServer()
  private readonly io: Server;

  @SubscribeMessage(MESSAGE_EVENTS.SEND)
  async sendMessageToChannel(@ConnectedSocket() client: Socket, @MessageBody() messageDto: MessageDto) {
    const data = await this.messageService.create(messageDto);

    this.io.in(`channel-${messageDto.channelId}`).emit(MESSAGE_EVENTS.RECEIVE, data);
  }

  @SubscribeMessage(MESSAGE_EVENTS.GET_ALL_CHANNEL_MESSAGE)
  async getAllChannelMessage(@ConnectedSocket() client: Socket, @MessageBody() channelId: number) {
    const data = await this.messageService.findAllChannelMessage(channelId);

    return <WsResponse>{
      event: MESSAGE_EVENTS.GET_ALL_CHANNEL_MESSAGE,
      data,
    };
  }
}
