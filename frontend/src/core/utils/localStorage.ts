import { User } from '../models/User';

export function saveSessionInfo(user: User, channelId: string | undefined) {
  const { id, userName } = user;

  localStorage.setItem('userId', id.toString());
  localStorage.setItem('userName', userName);
  localStorage.setItem('channelId', channelId ? channelId : '');
}

export function clearSessionInfo() {
  localStorage.clear();
}
