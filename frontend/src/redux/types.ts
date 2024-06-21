import store from './store';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export interface AppState {
  userName?: string;
  room: Room;
  client: {
    loading: boolean;
  };
}

export interface Room {
  id?: string;
  name?: string;
}
