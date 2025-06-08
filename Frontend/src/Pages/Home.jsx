import React, { useEffect } from 'react';
import { useSocket } from '../context/socket';
import ChatLayout from '../Components/ChatLayout';

const Home = () => {
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on('connect', () => {
      console.log('Connected to server');
    });
  }, [socket]);

  return <ChatLayout />;
};

export default Home;
