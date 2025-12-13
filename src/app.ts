import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import UserRouter from './routers/user.router';
import AdminRouter from './routers/admin.router';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// app.set("trust proxy", 1);
const originAllowed = ["https://linkedin-manager-beryl.vercel.app","http://localhost:3000"]
const corsOptions = {
  origin: originAllowed,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  // exposedHeaders: ["Set-Cookie"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));


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
