import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logoutSlice } from '../slice/authSlice';
import { logout } from '../apis';
import { useSocket } from '../context/socket';

const Home = () => {
  const socket = useSocket();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const { data } = await logout();

      if (data.status !== 'success') {
        throw new Error(data.message);
      }

      dispatch(logoutSlice());
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (!socket) return;

    socket.on('connect', () => {
      console.log('Connected to server');
    });
  }, [socket]);

  return (
    <div>
      <h1>Home</h1>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Home;
