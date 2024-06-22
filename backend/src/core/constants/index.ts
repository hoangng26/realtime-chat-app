export const SEQUELIZE: string = 'SEQUELIZE';

export enum CHANNEL_TYPE {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

// Repository
export const USER_REPOSITORY: string = 'USER_REPOSITORY';
export const CHANNEL_REPOSITORY: string = 'CHANNEL_REPOSITORY';
export const MESSAGE_REPOSITORY: string = 'MESSAGE_REPOSITORY';

// Event
export enum USER_EVENTS {
  CREATE = 'user:create',
  FIND_ALL = 'user:findAll',
  FIND_ONE = 'user:findOne',
  FIND_MANY = 'user:findMany',
  UPDATE = 'user:update',
  REMOVE = 'user:remove',
}
