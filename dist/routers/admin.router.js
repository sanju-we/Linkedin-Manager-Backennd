import { Router } from "express";
import authRouter from "./admin/admin.auth.routes";
import adminUserRouter from "./admin/admin.user.routes";
import adminMRouter from "./admin/admin.adminM.routes";
import { verifyAdminToken } from "../middleware/authMiddleware";
const AdminRouter = Router();
AdminRouter.use('/auth', authRouter)
    .use('/m', verifyAdminToken, adminUserRouter)
    .use('/am', verifyAdminToken, adminMRouter);
export default AdminRouter;
//# sourceMappingURL=admin.router.js.map