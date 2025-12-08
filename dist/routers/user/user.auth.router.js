"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const container_1 = require("../../core/DI/container");
const asyncHandler_1 = require("../../middleware/asyncHandler");
const userAuthRouter = (0, express_1.Router)();
const userController = container_1.container.get('IUserAuthController');
userAuthRouter.post('/login', (0, asyncHandler_1.asyncHandler)(userController.login.bind(userController)))
    .post('/logout', (0, asyncHandler_1.asyncHandler)(userController.logout.bind(userController)));
exports.default = userAuthRouter;
