import React, { use, useEffect, useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Avatar,
  ListItemAvatar,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useSocket } from '../context/socket';
import { useSelector } from 'react-redux';

const ChatSidebar = () => {
  const socket = useSocket();
  const profileUser = useSelector((state) => state.auth.user);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredUsers(filtered);
  };

  useEffect(() => {
    if (!socket) return;

    socket.emit('event:users');

    socket.on('event:users', (users) => {
      const filtered = users.filter((user) => user._id !== profileUser._id);
      setUsers(filtered);
      setFilteredUsers(filtered);
    });

    return () => {
      socket.off('event:users');
    };
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        p: 2,
        width: '100%',
        height: '100%',
        overflowY: 'scroll',
        bgcolor: 'background.paper',
        '&::-webkit-scrollbar': {
          width: 0,
        },
      }}
    >
      <TextField
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search users"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        variant="outlined"
        fullWidth
        sx={{ mb: 2, position: 'sticky', top: 0, zIndex: 1, bgcolor: '#fff' }}
      />
      <List
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
          '&::-webkit-scrollbar': {
            width: 0,
          },
          overflowY: 'scroll',
        }}
      >
        {filteredUsers.map((user) => (
          <ListItem
            key={user._id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              borderBottom: '1px solid #ccc',
              cursor: 'pointer',
              '&:last-child': {
                borderBottom: 'none',
              },
              '&:hover': {
                bgcolor: '#f5f5f5',
              },
            }}
          >
            <ListItemAvatar
              sx={{
                position: 'relative',
              }}
            >
              {!user.isOnline && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '12px',
                    height: '12px',
                    bgcolor: 'green',
                    borderRadius: '50%',
                    zIndex: 1,
                  }}
                />
              )}
              <Avatar src={user.avatar.url} alt={user.name} />
            </ListItemAvatar>
            <ListItemText primary={user.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ChatSidebar;
