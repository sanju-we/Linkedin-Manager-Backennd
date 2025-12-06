import { Router } from "express";
import { IAdminUserController } from "../../core/Interface/constroller/admin/Iadmin.user.controller.ts";
import { container } from "../../core/DI/container.ts";
import { asyncHandler } from "../../middleware/asyncHandler.ts";

const adminUserRouter = Router()
const adminUserController = container.get<IAdminUserController>('IAdminUserController');

adminUserRouter.post('/add',asyncHandler(adminUserController.addUser.bind(adminUserController)))
.get('/getAll',asyncHandler(adminUserController.getALl.bind(adminUserController)))

export default adminUserRouter