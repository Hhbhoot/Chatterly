import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Avatar,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { register } from '../apis';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSlice } from '../slice/authSlice';
import { Helmet } from 'react-helmet-async';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    avatar: null,
  });

  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'avatar') {
      const file = files[0];
      setFormData({ ...formData, avatar: file });
      setAvatarPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, gender, confirmPassword, avatar } = formData;
    if (!name || !email || !password || !confirmPassword || !gender) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }
    const dataToSend = new FormData();
    dataToSend.append('name', name);
    dataToSend.append('email', email);
    dataToSend.append('password', password);
    dataToSend.append('confirmPassword', confirmPassword);
    dataToSend.append('gender', gender);
    dataToSend.append('avatar', avatar);

    try {
      const { data } = await register(dataToSend);

      if (data.status !== 'success') {
        throw new Error(data.message);
      }
      dispatch(loginSlice(data.data));
      toast.success(data.message || 'Registration successful');
      navigate('/');
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: '',
        avatar: null,
      });
      setAvatarPreview(null);
    } catch (error) {
      toast.error(
        error.response.data.message || error.message || 'An error occurred',
      );
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{import.meta.env.VITE_APP_TITLE} | Register</title>
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
          {/* Logo */}
          <Box sx={{ textAlign: 'center', mb: 1.5 }}>
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
            Register to {import.meta.env.VITE_APP_TITLE}
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
              <Box sx={{ flex: { xs: '0 0 100%', md: '0 0 48%' } }}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Box>

              <Box sx={{ flex: { xs: '0 0 100%', md: '0 0 48%' } }}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Box>

              <Box sx={{ flex: { xs: '0 0 100%', md: '0 0 48%' } }}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Box>

              <Box sx={{ flex: { xs: '0 0 100%', md: '0 0 48%' } }}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </Box>

              <Box sx={{ flex: { xs: '0 0 100%' } }}>
                <FormControl fullWidth>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="gender"
                    value={formData.gender}
                    label="Gender"
                    onChange={handleChange}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ flex: { xs: '0 0 100%' } }}>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<CloudUploadIcon />}
                  fullWidth
                >
                  Upload Avatar
                  <input
                    type="file"
                    hidden
                    name="avatar"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </Button>
                {avatarPreview && (
                  <Box mt={2} display="flex" justifyContent="center">
                    <Avatar
                      src={avatarPreview}
                      sx={{ width: 64, height: 64 }}
                    />
                  </Box>
                )}
              </Box>
            </Box>

            <Box mt={3}>
              <Button type="submit" variant="contained" fullWidth size="large">
                Register
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default Register;
