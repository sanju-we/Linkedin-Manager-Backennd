import { Router } from "express";
import { container } from "../../core/DI/container";
import { asyncHandler } from "../../middleware/asyncHandler";
const adminMRouter = Router();
const adminManageController = container.get('IAdminManageController');
adminMRouter.post('/add', asyncHandler(adminManageController.addAdmin.bind(adminManageController)));
export default adminMRouter;
//# sourceMappingURL=admin.adminM.routes.js.map