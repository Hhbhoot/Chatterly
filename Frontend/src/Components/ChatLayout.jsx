import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  Tooltip,
} from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ImageIcon from '@mui/icons-material/Image';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import { styled } from '@mui/system';

const StyledChatLayout = styled(Box)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column-reverse',
  },
}));

const StyledHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

const StyledFooter = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

const ChatLayout = () => {
  return (
    <StyledChatLayout>
      <StyledHeader>
        <Typography variant="h6">Chat Screen</Typography>
        <Box sx={{ alignSelf: 'flex-end' }}>
          <Tooltip title="Make a Call">
            <IconButton>
              <CallIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Make a Video Call">
            <IconButton>
              <VideocamIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </StyledHeader>
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          padding: (theme) => theme.spacing(2),
        }}
      >
        Chat Messages will appear here
      </Box>
      <StyledFooter>
        <Box>
          <Tooltip title="Upload a File">
            <IconButton>
              <UploadFileIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Upload an Image">
            <IconButton>
              <ImageIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Upload a Video">
            <IconButton>
              <VideoLibraryIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Button variant="contained">Send</Button>
      </StyledFooter>
    </StyledChatLayout>
  );
};

export default ChatLayout;
