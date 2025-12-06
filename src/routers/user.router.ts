import { Router } from 'express';
import userAuthRouter from './user/user.auth.router.ts';

const userRouter = Router();

userRouter.use('/auth', userAuthRouter);

export default userRouter;