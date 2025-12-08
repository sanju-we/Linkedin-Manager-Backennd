import { Router } from "express";
import authRouter from "./admin/admin.auth.routes.ts";
import adminUserRouter from "./admin/admin.user.routes.ts";
import adminMRouter from "./admin/admin.adminM.routes.ts";
const AdminRouter = Router();
AdminRouter.use('/auth', authRouter)
    .use('/m', adminUserRouter)
    .use('/am', adminMRouter);
export default AdminRouter;
//# sourceMappingURL=admin.router.js.map