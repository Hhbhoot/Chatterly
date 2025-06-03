import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const ProtectedRoutes = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};
