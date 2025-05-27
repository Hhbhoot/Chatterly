import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Login, Register } from './Pages';

function App() {
  return <AppRouter />;
}

function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

function Layout({ children }) {
  return (
    <div>
      <h1>Layout</h1>
    </div>
  );
}

export default App;
