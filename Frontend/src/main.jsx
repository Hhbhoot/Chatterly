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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <HelmetProvider>
        <Provider store={store}>
          <AuthProvider>
            <App />
            <Toaster
              position="top-right"
              reverseOrder={false}
              toastOptions={{
                style: {
                  fontSize: '1.2rem',
                  padding: '1rem',
                  color: '#fff',
                  backgroundColor: '#333',
                  borderRadius: '0.5rem',
                  boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                },
                duration: 3000,
                success: {
                  style: {
                    backgroundColor: '#4CAF50',
                  },
                },
                error: {
                  style: {
                    backgroundColor: '#f44336',
                  },
                },
                info: {
                  style: {
                    backgroundColor: '#2196F3',
                  },
                },
                warning: {
                  style: {
                    backgroundColor: '#FFC107',
                  },
                },
              }}
            />
          </AuthProvider>
        </Provider>
      </HelmetProvider>
    </Router>
  </StrictMode>,
);
