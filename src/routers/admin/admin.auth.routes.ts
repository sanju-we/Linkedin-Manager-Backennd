import { Router } from "express";
import { IAdminAuthController } from "../../core/Interface/constroller/admin/Iadmin.auth.controller.ts";
import { container } from "../../core/DI/container.ts";
import { asyncHandler } from "../../middleware/asyncHandler.ts";

const authRouter = Router()
const authController = container.get<IAdminAuthController>('IAdminAuthController')

authRouter.post('/login',asyncHandler(authController.login.bind(authController)))

export default authRouter