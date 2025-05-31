import { useState } from 'react';
import { login as loginUser } from '../apis';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSlice } from '../slice/authSlice';
import { Helmet } from 'react-helmet-async';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const { data } = await loginUser(formData);

      if (data.status !== 'success') {
        throw new Error(data.message);
      }
      dispatch(loginSlice(data.data));
      setFormData({ email: '', password: '' });
      toast.success(data.message || 'Login successful');

      navigate('/');
    } catch (error) {
      toast.error(
        error.response.data.message || error.message || 'Login failed',
      );
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{import.meta.env.VITE_APP_TITLE} | Login</title>
      </Helmet>
      <Container
        maxWidth="sm"
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            my: 4,
            p: 4,
            borderRadius: 4,
            boxShadow: 3,
            backgroundColor: '#fff',
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <img
              src="/img/call.png" // Replace with your logo path
              alt="App Logo"
              style={{ height: 60 }}
            />
          </Box>
          {/* <Typography
            variant="h5"
            fontWeight="bold"
            align="center"
            gutterBottom
          >
            Login to {import.meta.env.VITE_APP_TITLE}
          </Typography> */}
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                mt: 2,
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ flex: { xs: '0 0 100%' } }}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Box>

              <Box sx={{ flex: { xs: '0 0 100%' } }}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Box>
            </Box>
            <Box mt={3}>
              <Button type="submit" variant="contained" fullWidth size="large">
                Login
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default Login;
