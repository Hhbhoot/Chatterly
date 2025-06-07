import { useState, useEffect } from 'react';
import { login as loginUser } from '../apis';
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSlice } from '../slice/authSlice';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';
import GoogleLogo from '../Components/GoogleLogo';
import FacebookLogo from '../Components/FacebookLogo';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const error = queryParams.get('error');
  const URL = import.meta.env.VITE_GOOGLE_CALLBACK;

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

  useEffect(() => {
    if (error) {
      toast.error('Login failed. Please try again.');
    }
  }, [error]);

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
                  autoComplete="email"
                  required
                  autoFocus
                />
              </Box>

              <Box sx={{ flex: { xs: '0 0 100%' } }}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <RemoveRedEyeIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Box>
            <Box mt={3}>
              <Button type="submit" variant="contained" fullWidth size="large">
                Login
              </Button>
            </Box>
          </form>

          <Box
            mt={2}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                textDecoration: 'none',
              }}
            >
              Don&apos;t have an account?{' '}
              <MuiLink
                sx={{
                  textDecoration: 'none',
                }}
                component={Link}
                to={'/register'}
              >
                Register here
              </MuiLink>
            </Typography>
            <Typography
              variant="body2"
              sx={{
                textDecoration: 'none',
              }}
            >
              <MuiLink
                sx={{
                  textDecoration: 'none',
                }}
                component={Link}
                to={'/forgot-password'}
              >
                Forgot Password ?
              </MuiLink>
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
            }}
          >
            <hr
              style={{
                border: '1px solid #ccc',
                margin: '20px 0',
                width: '100%',
              }}
            />
            <Typography variant="body2">Or</Typography>
            <hr
              style={{
                border: '1px solid #ccc',
                margin: '20px 0',
                width: '100%',
              }}
            />
          </Box>

          <Box
            mt={2}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
            }}
            textAlign="center"
          >
            <Button
              variant="contained"
              fullWidth
              size="large"
              endIcon={<GoogleLogo />}
              sx={{
                backgroundColor: 'white',
                color: 'black',
                border: '1px solid #ccc',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: 'white',
                  color: 'black',
                  boxShadow: 'none',
                },
              }}
              onClick={() => {
                window.open(`${URL}`, '_self');
              }}
            ></Button>
            <Button
              variant="contained"
              fullWidth
              size="large"
              endIcon={<FacebookLogo />}
              sx={{
                backgroundColor: 'white',
                color: 'black',
                border: '1px solid #ccc',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: 'white',
                  color: 'black',
                  boxShadow: 'none',
                },
              }}
              onClick={() => {
                window.open(
                  `${import.meta.env.VITE_FACEBOOK_CALLBACK}`,
                  '_self',
                );
              }}
            ></Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
