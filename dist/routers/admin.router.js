"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_auth_routes_1 = __importDefault(require("./admin/admin.auth.routes"));
const admin_user_routes_1 = __importDefault(require("./admin/admin.user.routes"));
const admin_adminM_routes_1 = __importDefault(require("./admin/admin.adminM.routes"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const AdminRouter = (0, express_1.Router)();
AdminRouter.use('/auth', admin_auth_routes_1.default)
    .use('/m', authMiddleware_1.verifyAdminToken, admin_user_routes_1.default)
    .use('/am', authMiddleware_1.verifyAdminToken, admin_adminM_routes_1.default);
exports.default = AdminRouter;
