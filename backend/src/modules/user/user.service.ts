import { Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { USER_REPOSITORY } from 'src/core/constants';
import { UpdateUserDto, UserDto } from 'src/core/dtos/user.dto';
import { User } from 'src/core/models/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: typeof User,
  ) {}

  async create(userDto: UserDto): Promise<User> {
    return await this.userRepository.create<User>(userDto, {
      returning: true,
    });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll<User>();
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({
      where: {
        id,
      },
    });
  }

  async findMany(query: string): Promise<User[]> {
    return await this.userRepository.findAll({
      where: {
        userName: {
          [Op.substring]: query,
        },
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    updateUserDto;
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
