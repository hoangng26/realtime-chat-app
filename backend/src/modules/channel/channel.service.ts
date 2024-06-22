import { Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { CHANNEL_REPOSITORY } from 'src/core/constants';
import { ChannelDto } from 'src/core/dtos/channel.dto';
import { Channel } from 'src/core/models/channel.entity';

@Injectable()
export class ChannelService {
  constructor(
    @Inject(CHANNEL_REPOSITORY)
    private readonly channelRepository: typeof Channel,
  ) {}

  async create(channelDto: ChannelDto): Promise<Channel> {
    return await this.channelRepository.create<Channel>(channelDto, {
      returning: true,
    });
  }

  async findAll(): Promise<Channel[]> {
    return await this.channelRepository.findAll<Channel>();
  }

  async findOne(id: number): Promise<Channel> {
    return await this.channelRepository.findOne<Channel>({
      where: {
        id,
      },
    });
  }

  async findMany(query: string): Promise<Channel[]> {
    return await this.channelRepository.findAll({
      where: {
        name: {
          [Op.substring]: `${query}`,
        },
      },
    });
  }
}
