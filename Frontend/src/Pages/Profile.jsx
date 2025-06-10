import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Container,
  Grid,
  Avatar,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { loginSlice } from '../slice/authSlice';
import { toast } from 'react-hot-toast';
import { ArrowBack } from '@mui/icons-material';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    if (avatar) {
      formData.append('avatar', avatar);
    }
    try {
      const response = await updateProfile(formData);
      dispatch(loginSlice(response.data));
      setLoading(false);
      toast.success('Profile updated successfully');
      navigate('/');
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <Container maxWidth="md" sx={{ py: 2 }}>
      <Helmet>
        <title>Profile - Chatterly</title>
      </Helmet>
      <Card>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h5">Profile</Typography>
            <IconButton onClick={() => navigate('/')}>
              <ArrowBack />
            </IconButton>
          </Box>
          <form onSubmit={handleUpdate}>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {avatarPreview ? (
                    <Avatar
                      src={avatarPreview}
                      sx={{ width: 150, height: 150 }}
                    />
                  ) : (
                    <Avatar
                      src={user?.avatar?.url}
                      sx={{ width: 150, height: 150 }}
                    />
                  )}
                </Box>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  hidden
                />
                <Button
                  variant="contained"
                  color="primary"
                  component="label"
                  sx={{ mt: 2 }}
                >
                  Change Avatar
                </Button>
              </Grid>
              <Grid item xs={12} md={8}>
                <TextField
                  label="Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  variant="outlined"
                  fullWidth
                  required
                  sx={{ mt: 2 }}
                />
                <TextField
                  label="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
                  fullWidth
                  required
                  sx={{ mt: 2 }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                'Update Profile'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Profile;
