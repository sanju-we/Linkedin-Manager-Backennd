import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import UserRouter from './routers/user.router';
import AdminRouter from './routers/admin.router';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// CORS configuration - flexible for development
const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins: string[] = [
      'http://localhost:3000',
      'https://linkedin-manager-tawny.vercel.app',
    ];

    if (process.env.NODE_ENV === 'development') {
      if (!origin) {
        return callback(null, true);
      }

      if (/^http:\/\/localhost:\d+$/.test(origin)) {
        return callback(null, true);
      }

      if (/^http:\/\/(192\.168\.\d+\.\d+|172\.(1[6-9]|2\d|3[01])\.\d+\.\d+|10\.\d+\.\d+\.\d+):\d+$/.test(origin)) {
        console.log(`CORS: Allowing origin in development: ${origin}`);
        return callback(null, true);
      }
    }

    if (origin && allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    if (process.env.NODE_ENV === 'development') {
      console.warn(`CORS: Allowing origin in development (fallback): ${origin}`);
      return callback(null, true);
    }

    callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Increase body size limit for file uploads (50MB)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use('/api/user', UserRouter);
app.use('/api/admin', AdminRouter);

app.use(errorHandler);

export function createApp() {
  return app;
}
