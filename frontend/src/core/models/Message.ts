import { Channel } from './Channel';
import { User } from './User';

export interface Message {
  id: bigint;
  content: string;
  userId: number;
  channelId: number;
  user?: User;
  channel?: Channel;
  createdAt: Date;
}
