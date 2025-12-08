import { Router } from "express";
import { IAdminAuthController } from "../../core/Interface/controller/admin/Iadmin.auth.controller";
import { container } from "../../core/DI/container";
import { asyncHandler } from "../../middleware/asyncHandler";

const authRouter = Router()
const authController = container.get<IAdminAuthController>('IAdminAuthController')

authRouter.post('/login',asyncHandler(authController.login.bind(authController)))

export default authRouter