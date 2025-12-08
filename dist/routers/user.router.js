import { Router } from 'express';
import userAuthRouter from './user/user.auth.router';
import userProfileRouter from './user/user.profile.routes';
import { verifyToken } from '../middleware/authMiddleware';
import userRefreshRouter from './user/user.refresh.routes';
const userRouter = Router();
userRouter.use('/auth', userAuthRouter)
    .use('/refreshToken', userRefreshRouter)
    .use('/profile', verifyToken, userProfileRouter);
export default userRouter;
//# sourceMappingURL=user.router.js.map