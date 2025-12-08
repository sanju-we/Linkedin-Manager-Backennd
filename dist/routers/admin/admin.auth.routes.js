"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const container_1 = require("../../core/DI/container");
const asyncHandler_1 = require("../../middleware/asyncHandler");
const authRouter = (0, express_1.Router)();
const authController = container_1.container.get('IAdminAuthController');
authRouter.post('/login', (0, asyncHandler_1.asyncHandler)(authController.login.bind(authController)));
exports.default = authRouter;
//# sourceMappingURL=admin.auth.routes.js.map