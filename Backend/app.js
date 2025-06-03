import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import GlobalErrorHandler from './Controllers/ErrorController.js';
import AppError from './Utils/AppError.js';
import UserRouter from './Routes/UserRoutes.js';
import AuthRouter from './Routes/AuthRoutes.js';
import cookieParser from 'cookie-parser';
import { helmetConfig } from './Config/helmet.js';
import path from 'path';
const __dirname = path.resolve();
import passport from './passport/index.js';
import session from 'express-session';

const app = express();

const corsOptions = {
  origin: process.env.DOMAIN_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(helmet(helmetConfig));
app.use(cookieParser());
app.use(morgan('dev'));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.set('trust proxy', true);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'None',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api', (req, res) => {
  res.send('Hello from Chatterly');
});

app.get('/api/health-check', (req, res) => res.send('OK'));

app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/users', UserRouter);

app.all(/.*/, (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(GlobalErrorHandler);

export default app;
