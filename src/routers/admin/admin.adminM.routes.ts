import { Router } from "express";
import { IAdminManageController } from "../../core/Interface/constroller/admin/Iadmin.adminM.controller.ts";
import { container } from "../../core/DI/container.ts";
import { asyncHandler } from "../../middleware/asyncHandler.ts";

const adminMRouter = Router()
const adminManageController = container.get<IAdminManageController>('IAdminManageController')

adminMRouter.post('/add',asyncHandler(adminManageController.addAdmin.bind(adminManageController)))

export default adminMRouter