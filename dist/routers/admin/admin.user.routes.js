"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const container_1 = require("../../core/DI/container");
const asyncHandler_1 = require("../../middleware/asyncHandler");
const adminUserRouter = (0, express_1.Router)();
const adminUserController = container_1.container.get('IAdminUserController');
adminUserRouter.post('/add', (0, asyncHandler_1.asyncHandler)(adminUserController.addUser.bind(adminUserController)))
    .get('/getAll', (0, asyncHandler_1.asyncHandler)(adminUserController.getALl.bind(adminUserController)))
    .get('/getUser/:id', (0, asyncHandler_1.asyncHandler)(adminUserController.getUser.bind(adminUserController)));
exports.default = adminUserRouter;
//# sourceMappingURL=admin.user.routes.js.map