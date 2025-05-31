import './App.css';
import { Routes, Route, Router, Outlet } from 'react-router-dom';
import { Home, Login, Register } from './Pages';
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
          path="/*"
          element={
            <ProtectedRoutes>
              <Layout>
                <Routes>
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
