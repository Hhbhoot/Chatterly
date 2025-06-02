import helmet from 'helmet';

export const helmetConfig = {
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      // Allow Google OAuth redirect
      'form-action': [
        "'self'",
        'http://localhost:8080',
        'https://accounts.google.com',
      ],
      // Allow images (e.g., from Auth.js UI)
      'img-src': ["'self'", 'data:', 'https://authjs.dev'],
      // Allow Google scripts (if needed by Auth.js)
      'script-src': [
        "'self'",
        "'unsafe-inline'",
        'https://accounts.google.com',
      ],
      // Allow frontend communication
      'connect-src': ["'self'", 'http://localhost:3000'],
    },
  },
};
