import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Channel } from './channel.entity';
import { User } from './user.entity';

@Table({
  paranoid: true,
})
export class User_Channel extends Model<User_Channel> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @ForeignKey(() => Channel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  channelId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Channel)
  channel: Channel;
}
