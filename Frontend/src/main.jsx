import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { store } from './store/index.js';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/Auth.jsx';
import { SocketProvider } from './context/socket.jsx';
import { toastOptions } from './config/toast.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <HelmetProvider>
        <Provider store={store}>
          <AuthProvider>
            <SocketProvider>
              <App />
              <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={toastOptions}
              />
            </SocketProvider>
          </AuthProvider>
        </Provider>
      </HelmetProvider>
    </Router>
  </StrictMode>,
);
