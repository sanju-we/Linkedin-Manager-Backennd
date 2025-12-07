import { Router } from 'express';
import { IUserAuthController } from '../../core/Interface/constroller/user/Iuser.auth.controller.ts';
import { container } from '../../core/DI/container.ts';
import { asyncHandler } from '../../middleware/asyncHandler.ts';

const userAuthRouter = Router();
const userController = container.get<IUserAuthController>('IUserAuthController')

userAuthRouter.post('/login', asyncHandler(userController.login.bind(userController)))
.post('/logout', asyncHandler(userController.logout.bind(userController)))

export default userAuthRouter;