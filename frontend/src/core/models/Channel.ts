import { CHANNEL_TYPE } from '../constants';

export interface Channel {
  id: number;
  name: string;
  type: CHANNEL_TYPE;
}
