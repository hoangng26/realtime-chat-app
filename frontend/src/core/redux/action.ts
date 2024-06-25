import { Channel } from '@/core/models/Channel';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { initialAppState } from '.';
import { User } from '../models/User';
import { AppDispatch, AppState, RootState } from './types';

export const appSlice = createSlice({
  name: 'app',
  initialState: initialAppState,
  reducers: {
    SET_USER: (state: AppState, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    LOG_OUT: (state: AppState) => {
      const { user, channel, selectedChannel } = initialAppState;
      state.user = user;
      state.channel = channel;
      state.selectedChannel = selectedChannel;
    },
    SET_LIST_CHANNEL: (state: AppState, action: PayloadAction<Channel[]>) => {
      state.channel = [...action.payload];
    },
    SET_CHANNEL: (state: AppState, action: PayloadAction<Channel>) => {
      state.selectedChannel = action.payload;
    },
    LOADING_ENABLE: (state: AppState) => {
      state.client.loading = true;
    },
    LOADING_DISABLE: (state: AppState) => {
      state.client.loading = false;
    },
  },
});

export const { SET_USER, LOG_OUT, SET_LIST_CHANNEL, SET_CHANNEL, LOADING_ENABLE, LOADING_DISABLE } = appSlice.actions;

export const useAppState = () => useSelector((state: RootState) => state.app);
export const useAppDispatch = () => useDispatch<AppDispatch>();
