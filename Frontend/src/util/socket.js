import { io } from 'socket.io-client';
const socketUrl = import.meta.env.VITE_SOCKET_URL;

function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp(
      `(?:^|; )${name.replace(/([.$?*|{}()[]\\\/+^])/g, '\\$1')}=([^;]*)`,
    ),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

const token = getCookie('token');

export const socket = io(socketUrl, {
  withCredentials: true,
  transports: ['websocket'],
  auth: {
    token: token,
  },
});

socket.on('connect_error', (err) => {
  console.error('Socket connection error:', err.message);
});
