import React, { useEffect } from 'react';
import { useSocket } from '../context/socket';
import ChatLayout from '../Components/ChatLayout';
import { Box } from '@mui/material';
import ChatSidebar from '../Components/ChatSidebar';

const Home = () => {
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on('connect', () => {
      console.log('Connected to server');
    });
  }, [socket]);

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '88vh',
        maxHeight: '88vh',
      }}
    >
      <Box
        sx={{
          width: { xs: '0px', md: '280px' },
        }}
      >
        <ChatSidebar />
      </Box>
      <ChatLayout />
    </Box>
  );
};

export default Home;
