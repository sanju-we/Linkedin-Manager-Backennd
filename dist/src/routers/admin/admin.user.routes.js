import { Router } from "express";
import { container } from "../../core/DI/container.ts";
import { asyncHandler } from "../../middleware/asyncHandler.ts";
const adminUserRouter = Router();
const adminUserController = container.get('IAdminUserController');
adminUserRouter.post('/add', asyncHandler(adminUserController.addUser.bind(adminUserController)))
    .get('/getAll', asyncHandler(adminUserController.getALl.bind(adminUserController)));
export default adminUserRouter;
//# sourceMappingURL=admin.user.routes.js.map