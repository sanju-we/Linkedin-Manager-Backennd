import { Router } from "express";
import { asyncHandler } from "../../middleware/asyncHandler.ts";
import { container } from "../../core/DI/container.ts";
import { IUserAuthController } from "../../core/Interface/constroller/user/Iuser.auth.controller.ts";

const userRefreshRouter = Router();
const userController = container.get<IUserAuthController>('IUserAuthController');

userRefreshRouter.post('/', asyncHandler(userController.refreshToken.bind(userController)))

export default userRefreshRouter;