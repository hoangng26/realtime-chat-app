import { CHANNEL_TYPE } from '../constants';
import { AppState } from './types';

export const initialAppState: AppState = {
  user: {
    id: 0,
    userName: '',
  },
  channel: [],
  selectedChannel: {
    id: 0,
    name: '',
    type: CHANNEL_TYPE.PUBLIC,
  },
  client: {
    loading: false,
  },
};
