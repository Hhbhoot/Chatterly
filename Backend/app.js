import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import GlobalErrorHandler from './Controllers/ErrorController.js';
import AppError from './Utils/AppError.js';
import UserRouter from './Routes/UserRoutes.js';
import { ExpressAuth } from '@auth/express';
import Google from '@auth/express/providers/google';

const app = express();

const corsOptions = {
  origin: process.env.DOMAIN_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan('dev'));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.set('trust proxy', true);
app.get('/api', (req, res) => {
  res.send('Hello from Chatterly');
});

app.get('/api/health-check', (req, res) => res.send('OK'));
app.use('/api/auth', ExpressAuth({ providers: [Google] }));
app.use('/api/v1/users', UserRouter);

app.all(/.*/, (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(GlobalErrorHandler);

export default app;
