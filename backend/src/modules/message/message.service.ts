import { Inject, Injectable } from '@nestjs/common';
import { MESSAGE_REPOSITORY } from 'src/core/constants';
import { MessageDto } from 'src/core/dtos/message.dto';
import { Message } from 'src/core/models/message.entity';
import { User } from 'src/core/models/user.entity';

@Injectable()
export class MessageService {
  constructor(
    @Inject(MESSAGE_REPOSITORY)
    private readonly messageRepository: typeof Message,
  ) {}

  async create(messageDto: MessageDto): Promise<Message> {
    return this.messageRepository.create<Message>(messageDto, {
      returning: true,
    });
  }

  async findAllChannelMessage(channelId: number): Promise<Message[]> {
    return this.messageRepository.findAll<Message>({
      where: {
        channelId: channelId,
      },
      include: User,
    });
  }
}
