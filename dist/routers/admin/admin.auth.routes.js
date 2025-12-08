import { Router } from "express";
import { container } from "../../core/DI/container";
import { asyncHandler } from "../../middleware/asyncHandler";
const authRouter = Router();
const authController = container.get('IAdminAuthController');
authRouter.post('/login', asyncHandler(authController.login.bind(authController)));
export default authRouter;
//# sourceMappingURL=admin.auth.routes.js.map