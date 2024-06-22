export class UserDto {
  readonly userName: string;
  readonly isActive?: boolean;
}

export class UpdateUserDto extends UserDto {
  readonly id: number;
}
