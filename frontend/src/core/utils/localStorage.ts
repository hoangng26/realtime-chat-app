export function saveSessionInfo(userName: string, channelId: number | undefined) {
  localStorage.setItem('userName', userName);
  localStorage.setItem('channelId', channelId ? channelId.toString() : '');
}
