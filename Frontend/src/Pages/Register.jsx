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
import { Helmet } from 'react-helmet';
import { register } from '../apis';
import toast from 'react-hot-toast';

const Register = () => {
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
    const { name, email, password, confirmPassword, avatar } = formData;
    console.log(formData);
    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match', {
        duration: 3000,
        position: 'top-right',
      });
      return;
    }

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }
    console.log('hello');
    const dataToSend = new FormData();
    dataToSend.append('name', name);
    dataToSend.append('email', email);
    dataToSend.append('password', password);
    dataToSend.append('gender', gender);
    dataToSend.append('avatar', avatar);

    try {
      const { data } = await register(dataToSend);

      if (!data.status !== 200) {
        throw new Error(data.message);
      }
      toast.success(data.message, {
        duration: 3000,
        position: 'top-right',
      });
    } catch (error) {
      toast.error(error.message, {
        duration: 3000,
        position: 'top-right',
      });
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
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <img
              src="/img/call.png" // Replace with your logo path
              alt="App Logo"
              style={{ height: 60 }}
            />
          </Box>

          <Typography
            variant="h5"
            fontWeight="bold"
            align="center"
            gutterBottom
          >
            Register to {import.meta.env.VITE_APP_TITLE}
          </Typography>

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
