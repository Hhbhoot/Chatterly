import React from 'react';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logoutSlice } from '../slice/authSlice';
import { logout } from '../apis';

const Home = () => {
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

  return (
    <div>
      <h1>Home</h1>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Home;
