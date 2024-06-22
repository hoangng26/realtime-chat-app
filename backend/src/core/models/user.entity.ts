import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  paranoid: true,
})
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  userName: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isActive?: boolean;
}
