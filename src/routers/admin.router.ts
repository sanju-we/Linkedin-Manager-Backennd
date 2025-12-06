import { Router } from "express";
import authRouter from "./admin/admin.auth.router.ts";

const AdminRouter = Router()

AdminRouter.use('/auth',authRouter)

export default AdminRouter