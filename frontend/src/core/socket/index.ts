import { io } from 'socket.io-client';

const URL = import.meta.env.API_ENDPOINT;

export const socket = io(URL);
