import './App.css';
import { Routes, Route, Router, Outlet } from 'react-router-dom';
import {
  AuthSuccess,
  ForgotPassword,
  Home,
  Login,
  Register,
  ResetPassword,
} from './Pages';
import { ProtectedRoutes } from './Components/ProtectedRoutes';
import PublicRoute from './Components/PublicRoute';

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
                  <Route path="/auth-success" element={<AuthSuccess />} />
                  <Route path="/" element={<Home />} />
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
    <div>
      <div className="container">{children}</div>
    </div>
  );
}

export default App;
