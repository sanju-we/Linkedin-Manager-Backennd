"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_auth_router_1 = __importDefault(require("./user/user.auth.router"));
const user_profile_routes_1 = __importDefault(require("./user/user.profile.routes"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const user_refresh_routes_1 = __importDefault(require("./user/user.refresh.routes"));
const userRouter = (0, express_1.Router)();
userRouter.use('/auth', user_auth_router_1.default)
    .use('/refreshToken', user_refresh_routes_1.default)
    .use('/profile', authMiddleware_1.verifyToken, user_profile_routes_1.default);
exports.default = userRouter;
