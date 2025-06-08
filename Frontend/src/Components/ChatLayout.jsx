// ChatLayout.jsx
import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material';

const drawerWidth = 300;

const ChatLayout = () => {
  return (
    <Box sx={{ display: 'flex', bgcolor: '#f0f2f5' }}>
      {/* Sidebar / Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            height: '80vh',
            borderRight: '1px solid #ddd',
          },
        }}
      >
        <Box sx={{ p: 2 }}>Search</Box>
        <Divider />
        <List>
          {[...Array(10)].map((_, index) => (
            <ListItem button key={index}>
              <ListItemText
                primary={`User ${index + 1}`}
                secondary="Last message preview..."
              />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Chat Screen */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          bgcolor: '#e5ddd5',
          display: 'flex',
          flexDirection: 'column',
          height: '90vh',
        }}
      >
        {/* Chat Header */}
        <Box sx={{ p: 1, bgcolor: '#ededed', borderBottom: '1px solid #ccc' }}>
          <Typography variant="subtitle1">User Name</Typography>
        </Box>

        {/* Messages Area */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          {[...Array(20)].map((_, i) => (
            <Box
              key={i}
              sx={{
                alignSelf: i % 2 === 0 ? 'flex-start' : 'flex-end',
                bgcolor: i % 2 === 0 ? 'white' : '#dcf8c6',
                px: 2,
                py: 1,
                borderRadius: 2,
                maxWidth: '70%',
                maxHeight: '100%',
                overflow: 'auto',
              }}
            >
              <Typography variant="body2">This is message {i + 1}</Typography>
            </Box>
          ))}
        </Box>

        {/* Input Box */}
        <Box
          sx={{
            p: 1,
            bgcolor: '#f0f0f0',
            borderTop: '1px solid #ccc',
          }}
        >
          <input
            type="text"
            placeholder="Type a message"
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '20px',
              border: '1px solid #ccc',
              outline: 'none',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ChatLayout;
