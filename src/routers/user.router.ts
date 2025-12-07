import { Router } from 'express';
import userAuthRouter from './user/user.auth.router.ts';
import userProfileRouter from './user/user.profile.routes.ts';
import { verifyToken } from '../middleware/authMiddleware.ts';

const userRouter = Router();

userRouter.use('/auth', userAuthRouter)
.use('/profile', verifyToken, userProfileRouter)

export default userRouter;