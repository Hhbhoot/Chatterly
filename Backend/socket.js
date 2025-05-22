import { Server } from 'socket.io';

let io;
export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.DOMAIN_URL,
      credentials: true,
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('a user connected with socket id', socket.id);

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
};

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};
