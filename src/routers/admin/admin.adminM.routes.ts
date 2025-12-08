import { Router } from "express";
import { IAdminManageController } from "../../core/Interface/controller/admin/Iadmin.adminM.controller";
import { container } from "../../core/DI/container";
import { asyncHandler } from "../../middleware/asyncHandler";

const adminMRouter = Router()
const adminManageController = container.get<IAdminManageController>('IAdminManageController')

adminMRouter.post('/add',asyncHandler(adminManageController.addAdmin.bind(adminManageController)))

export default adminMRouter