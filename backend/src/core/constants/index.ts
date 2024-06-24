export const SEQUELIZE: string = 'SEQUELIZE';

export enum CHANNEL_TYPE {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

// Repository
export const USER_REPOSITORY: string = 'USER_REPOSITORY';
export const CHANNEL_REPOSITORY: string = 'CHANNEL_REPOSITORY';
export const USER_CHANNEL_REPOSITORY: string = 'USER_CHANNEL_REPOSITORY';
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

export enum CHANNEL_EVENTS {
  CREATE = 'channel:create',
  FIND_ALL = 'channel:findAll',
  FIND_ONE = 'channel:findOne',
  FIND_MANY = 'channel:findMany',
  UPDATE = 'channel:update',
  REMOVE = 'channel:remove',
  JOIN = 'channel:join',
  FIND_USER_CHANNELS = 'channel:findUserChannels',
}

export enum MESSAGE_EVENTS {
  SEND = 'message:send',
  RECEIVE = 'message:receive',
  GET_ALL_CHANNEL_MESSAGE = 'message:getAllChannelMessage',
}
