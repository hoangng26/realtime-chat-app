import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialAppState } from '.';
import { AppState, Room } from './types';

export const appSlice = createSlice({
  name: 'app',
  initialState: initialAppState,
  reducers: {
    SET_USER: (state: AppState, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    SET_ROOM: (state: AppState, action: PayloadAction<Room>) => {
      state.room = action.payload;
    },
    LOADING_ENABLE: (state: AppState) => {
      state.client.loading = true;
    },
    LOADING_DISABLE: (state: AppState) => {
      state.client.loading = false;
    },
  },
});

export const { SET_USER, SET_ROOM, LOADING_ENABLE, LOADING_DISABLE } = appSlice.actions;
