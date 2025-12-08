import { Router } from 'express';
import { IUserAuthController } from '../../core/Interface/controller/user/Iuser.auth.controller.js';
import { container } from '../../core/DI/container';
import { asyncHandler } from '../../middleware/asyncHandler';

const userAuthRouter = Router();
const userController = container.get<IUserAuthController>('IUserAuthController')

userAuthRouter.post('/login', asyncHandler(userController.login.bind(userController)))
.post('/logout', asyncHandler(userController.logout.bind(userController)))

export default userAuthRouter;