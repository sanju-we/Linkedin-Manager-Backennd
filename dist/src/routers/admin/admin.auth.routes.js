import { Router } from "express";
import { container } from "../../core/DI/container.ts";
import { asyncHandler } from "../../middleware/asyncHandler.ts";
const authRouter = Router();
const authController = container.get('IAdminAuthController');
authRouter.post('/login', asyncHandler(authController.login.bind(authController)));
export default authRouter;
//# sourceMappingURL=admin.auth.routes.js.map