import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Avatar,
  CircularProgress,
} from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';
import toast from 'react-hot-toast';
import { forgotPassword } from '../apis';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address.');
      return;
    }
    setLoading(true);
    try {
      const { data } = await forgotPassword({ email });

      if (data.status !== 'success') {
        throw new Error(data.message);
      }
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
      px={2}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 400,
          p: 4,
          boxShadow: 6,
          borderRadius: 3,
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <ArrowBackIcon
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            cursor: 'pointer',
          }}
          onClick={() => navigate('/login')}
        />
        <CardContent>
          <Avatar sx={{ bgcolor: 'primary.main', mx: 'auto', mb: 2 }}>
            <LockResetIcon />
          </Avatar>
          <Typography variant="h5" gutterBottom>
            Forgot Password
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Enter your email address below and we’ll send you instructions to
            reset your password.
          </Typography>

          {submitted ? (
            <Typography variant="body1" color="success.main">
              If the email exists, a reset link has been sent!
            </Typography>
          ) : (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Email Address"
                variant="outlined"
                fullWidth
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                sx={{ py: 1.3, fontWeight: 600 }}
              >
                {loading ? (
                  <>
                    <CircularProgress size={20} />
                    <span style={{ marginLeft: 8 }}>Sending...</span>
                  </>
                ) : (
                  'Send Reset Link'
                )}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default ForgotPassword;
