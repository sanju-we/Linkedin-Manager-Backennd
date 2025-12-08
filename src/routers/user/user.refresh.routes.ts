import { Router } from "express";
import { asyncHandler } from "../../middleware/asyncHandler";
import { container } from "../../core/DI/container";
import { IUserAuthController } from "../../core/Interface/controller/user/Iuser.auth.controller";

const userRefreshRouter = Router();
const userController = container.get<IUserAuthController>('IUserAuthController');

userRefreshRouter.post('/', asyncHandler(userController.refreshToken.bind(userController)))

export default userRefreshRouter;