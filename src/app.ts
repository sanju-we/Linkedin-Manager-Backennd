import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import UserRouter from './routers/user.router.ts';
import AdminRouter from './routers/admin.router.ts';

const app = express();

const originAllowed = ['http://localhost:3000', 'https://linkedin-management.vercel.app'];
app.use(cors({
    origin: originAllowed,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan('dev'))
app.use('/api/user', UserRouter)
app.use('/api/admin', AdminRouter)

export function createApp() {
    return app
}