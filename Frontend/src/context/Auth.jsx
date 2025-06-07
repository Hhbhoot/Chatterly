import { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getMe } from '../apis';
import { loginSlice, logoutSlice } from '../slice/authSlice';
import Spinner from '../Components/Spinner';
import { Box } from '@mui/material';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const isPublicRoute = [
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
  ].includes(location.pathname);

  const validateUser = async () => {
    setLoading(true);
    try {
      const { data } = await getMe();

      if (data?.status === 'success') {
        dispatch(loginSlice(data.data));

        // If already logged in and on login/register, redirect to home
        if (isPublicRoute) {
          navigate('/');
        }
      } else {
        dispatch(logoutSlice());

        // If not logged in and on a protected route, redirect to login
        if (!isPublicRoute) {
          navigate('/login');
        }
      }
    } catch (error) {
      dispatch(logoutSlice());
      if (!isPublicRoute) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    validateUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Spinner />
      </Box>
    );
  }

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
