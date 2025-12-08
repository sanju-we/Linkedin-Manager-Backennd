"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const container_1 = require("../../core/DI/container");
const asyncHandler_1 = require("../../middleware/asyncHandler");
const adminMRouter = (0, express_1.Router)();
const adminManageController = container_1.container.get('IAdminManageController');
adminMRouter.post('/add', (0, asyncHandler_1.asyncHandler)(adminManageController.addAdmin.bind(adminManageController)));
exports.default = adminMRouter;
