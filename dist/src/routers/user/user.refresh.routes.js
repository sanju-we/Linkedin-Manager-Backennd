import { Router } from "express";
import { asyncHandler } from "../../middleware/asyncHandler.ts";
import { container } from "../../core/DI/container.ts";
const userRefreshRouter = Router();
const userController = container.get('IUserAuthController');
userRefreshRouter.post('/', asyncHandler(userController.refreshToken.bind(userController)));
export default userRefreshRouter;
//# sourceMappingURL=user.refresh.routes.js.map