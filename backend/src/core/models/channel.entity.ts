import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { CHANNEL_TYPE } from '../constants';

@Table({
  paranoid: true,
})
export class Channel extends Model<Channel> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @Column({
    type: DataType.ENUM,
    values: [CHANNEL_TYPE.PUBLIC, CHANNEL_TYPE.PRIVATE],
    allowNull: false,
  })
  type: CHANNEL_TYPE;
}
