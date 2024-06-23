import { Inject, Injectable } from '@nestjs/common';
import { USER_CHANNEL_REPOSITORY } from 'src/core/constants';
import { UserChannelDto } from 'src/core/dtos/user_channel.dto';
import { Channel } from 'src/core/models/channel.entity';
import { User } from 'src/core/models/user.entity';
import { User_Channel } from 'src/core/models/user_channel.entity';

@Injectable()
export class UserChannelService {
  constructor(
    @Inject(USER_CHANNEL_REPOSITORY)
    private readonly userChannelRepository: typeof User_Channel,
  ) {}

  async create(data: UserChannelDto): Promise<User_Channel> {
    return await this.userChannelRepository.create<User_Channel>(data, {
      returning: true,
      include: [User, Channel],
    });
  }

  async findAllUserOfChannel(channelId: number): Promise<User_Channel[]> {
    return await this.userChannelRepository.findAll<User_Channel>({
      where: {
        channelId,
      },
      include: User,
    });
  }

  async findAllJoinedChannelOfUser(userId: number): Promise<User_Channel[]> {
    return await this.userChannelRepository.findAll<User_Channel>({
      where: {
        userId,
      },
      include: Channel,
    });
  }

  async findOne(data: UserChannelDto): Promise<User_Channel> {
    const { userId, channelId } = data;

    return await this.userChannelRepository.findOne<User_Channel>({
      where: {
        userId,
        channelId,
      },
      include: [User, Channel],
    });
  }
}
