"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asyncHandler_1 = require("../../middleware/asyncHandler");
const container_1 = require("../../core/DI/container");
const userRefreshRouter = (0, express_1.Router)();
const userController = container_1.container.get('IUserAuthController');
userRefreshRouter.post('/', (0, asyncHandler_1.asyncHandler)(userController.refreshToken.bind(userController)));
exports.default = userRefreshRouter;
//# sourceMappingURL=user.refresh.routes.js.map