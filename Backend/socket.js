import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import {
  getAllUsers,
  removeSocketId,
  updateSocketId,
} from './Utils/socketUtils.js';

let io;
export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.DOMAIN_URL,
      credentials: true,
      methods: ['GET', 'POST'],
    },
  });

  io.use((socket, next) => {
    const cookies = socket.handshake.headers.cookie;
    if (!cookies) {
      return next(new Error('Authentication error: No cookies provided'));
    }
    const parsedCookies = cookie.parse(cookies);
    const token = parsedCookies.token;
    if (!token) {
      return next(new Error('Authentication error: No token provided'));
    }
    try {
      const decodecd = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decodecd.id;
      next();
    } catch (err) {
      next(new Error('Authentication error: Invalid token'));
    }
  });

  io.on('connection', async (socket) => {
    console.log('a user connected with socket id', socket.id);

    await updateSocketId(socket.userId, socket.id);

    socket.on('event:users', async () => {
      const users = await getAllUsers();
      io.emit('event:users', users);
    });

    socket.on('disconnect', async (reason) => {
      await removeSocketId(socket.userId);
      console.log(`❌ User disconnected: ${socket.id} | Reason: ${reason}`);
    });

    socket.on('error', (err) => {
      console.log('❗ Socket error:', err.message);
    });
  });
};

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};
