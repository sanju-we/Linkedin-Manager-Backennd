import { Router } from "express";
import { asyncHandler } from "../../middleware/asyncHandler";
import { container } from "../../core/DI/container";
const userRefreshRouter = Router();
const userController = container.get('IUserAuthController');
userRefreshRouter.post('/', asyncHandler(userController.refreshToken.bind(userController)));
export default userRefreshRouter;
//# sourceMappingURL=user.refresh.routes.js.map