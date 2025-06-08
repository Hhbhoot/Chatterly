import './App.css';
import { Routes, Route, Router, Outlet } from 'react-router-dom';
import {
  AuthSuccess,
  ForgotPassword,
  Home,
  Login,
  Profile,
  Register,
  ResetPassword,
} from './Pages';
import { ProtectedRoutes } from './Components/ProtectedRoutes';
import PublicRoute from './Components/PublicRoute';
import { Box } from '@mui/material';
import Header from './Components/Header';

function App() {
  return <AppRouter />;
}

function AppRouter() {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />

        <Route
          path="/*"
          element={
            <ProtectedRoutes>
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </Layout>
            </ProtectedRoutes>
          }
        />
      </Routes>
    </>
  );
}

function Layout({ children }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <Header />
      <Box>{children}</Box>
    </Box>
  );
}

export default App;
