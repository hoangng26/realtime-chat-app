import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(ChatGateway.name);

  @WebSocketServer()
  io: Server;

  messages = [];
  room = [];

  afterInit() {
    this.logger.debug('Initialized');
  }

  handleConnection(client: Socket) {
    const { sockets } = this.io.sockets;

    this.logger.debug(`Client id: ${client.id} connected`);
    this.logger.debug(`Number of connected clients: ${sockets.size}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.debug(`Client id: ${client.id} disconnected`);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any) {
    this.logger.debug(`Message received from client id: ${client.id}`);
    this.logger.debug(`Payload: ${payload}`);
    8;
    client.emit('test-event', 'Hello World');
  }

  @SubscribeMessage('channel:join')
  handleChannelJoin(client: Socket, payload: any) {
    const { username, room } = payload;
    const createdtime = Date.now();
    client.join(room);

    client.to(room).emit('message:send', {
      message: `${username} has joined this chat room`,
      username: 'CHAT_BOT',
      createtime: createdtime,
    });

    client.emit('message:send', {
      message: `Welcome ${username} to this channel`,
      username: 'CHAT_BOT',
      createtime: createdtime,
    });
  }

  @SubscribeMessage('message:send')
  handleMessageSend(client: Socket, payload: any) {
    const { room } = payload;

    this.messages.push(payload);

    this.io.in(room).emit('message:send', payload);
  }
}
