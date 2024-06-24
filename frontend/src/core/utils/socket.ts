import { socket } from '../socket';

export function socketEndSession() {
  socket.disconnect();
  socket.connect();
}
