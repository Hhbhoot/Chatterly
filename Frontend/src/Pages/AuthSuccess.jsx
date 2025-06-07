import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
} from '@mui/material';

const AuthSuccess = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 2000);
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
      px={2}
    >
      <Card
        sx={{
          minWidth: 300,
          maxWidth: 400,
          width: '100%',
          borderRadius: 3,
          boxShadow: 4,
          textAlign: 'center',
          p: 3,
        }}
      >
        <CardContent>
          {loading && (
            <>
              <CircularProgress color="primary" size={60} />
              <Typography variant="h5" mt={1} color="primary">
                Authentication Successful!
              </Typography>
              <Typography variant="body2" mt={1} color="primary">
                Redirecting to dashboard...
              </Typography>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default AuthSuccess;
