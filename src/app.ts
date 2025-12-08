import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import UserRouter from './routers/user.router';
import AdminRouter from './routers/admin.router';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const originAllowed = ['http://localhost:3000', 'https://linkedin-manager-beryl.vercel.app'];
app.use(
  cors({
    origin: originAllowed,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
);
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
