import { Router } from 'express';
import { container } from '../../core/DI/container.ts';
import { asyncHandler } from '../../middleware/asyncHandler.ts';
const userAuthRouter = Router();
const userController = container.get('IUserAuthController');
userAuthRouter.post('/login', asyncHandler(userController.login.bind(userController)))
    .post('/logout', asyncHandler(userController.logout.bind(userController)));
export default userAuthRouter;
//# sourceMappingURL=user.auth.router.js.map