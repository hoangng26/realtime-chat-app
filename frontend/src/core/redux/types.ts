import { Channel } from '@/core/models/Channel';
import { User } from '@/core/models/User';
import store from './store';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export interface AppState {
  user: User;
  channel: Channel[];
  selectedChannel: Channel;
  client: {
    loading: boolean;
  };
}
