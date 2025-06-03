import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
import http from 'http';
import { connectDB } from './Db/index.js';
import { initSocket } from './socket.js';
const PORT = process.env.PORT || 8000;
connectDB();
const server = http.createServer(app);

initSocket(server);

server.listen(PORT, async (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is running on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.error(err);
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (err) => {
  console.error(err);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received');
  server.close(() => {
    console.log('Process terminated');
  });
});
