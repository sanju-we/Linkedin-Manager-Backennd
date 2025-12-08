"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = verifyToken;
exports.verifyAdminToken = verifyAdminToken;
const errorMessages_1 = require("../utils/errorMessages");
const sendResponse_1 = require("../utils/sendResponse");
const StatusCodes_1 = require("../utils/StatusCodes");
const User_1 = require("../models/User");
const JWT_setup_1 = require("../utils/JWT.setup");
const logger_1 = require("../utils/logger");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Request_DTO_1 = require("../core/DTO/user/Request.DTO");
const Admin_1 = require("../models/Admin");
const ijwt = new JWT_setup_1.JWT();
const secret = process.env.JWT_SECRET || 'Linkedin@323';
async function verifyToken(req, res, next) {
    var _a;
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.startsWith('Bearer ')
            ? authHeader.split(' ')[1]
            : (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken;
        if (!token) {
            return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODE.FORBIDDEN, false, 'Access restricted, login first');
        }
        const payload = jsonwebtoken_1.default.verify(token, secret);
        if (!payload)
            return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODE.FORBIDDEN, false, 'Token expired');
        const user = await User_1.User.findById(payload.id);
        if (!user) {
            ijwt.blacklistRefreshToken(res);
            return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODE.UNAUTHORIZED, false, 'User not found');
        }
        if (payload.role !== 'user') {
            return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODE.UNAUTHORIZED, false, 'Invalid token role');
        }
        req.user = (0, Request_DTO_1.toUserAuth)(user);
        next();
    }
    catch (error) {
        const status = error instanceof errorMessages_1.HttpError ? error.statusCode : StatusCodes_1.STATUS_CODE.FORBIDDEN;
        const message = error instanceof Error ? error.message : 'Unknown error';
        logger_1.logger.error(`Failed to verify token: ${message}`);
        (0, sendResponse_1.sendResponse)(res, status, false, message);
    }
}
async function verifyAdminToken(req, res, next) {
    var _a;
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.startsWith('Bearer ')
            ? authHeader.split(' ')[1]
            : (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken;
        if (!token) {
            return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODE.FORBIDDEN, false, 'Access restricted, login first');
        }
        const payload = jsonwebtoken_1.default.verify(token, secret);
        if (!payload)
            return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODE.FORBIDDEN, false, 'Token expired');
        const user = await Admin_1.Admin.findById(payload.id);
        if (!user) {
            ijwt.blacklistRefreshToken(res);
            return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODE.UNAUTHORIZED, false, 'User not found');
        }
        if (payload.role !== 'user') {
            return (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODE.UNAUTHORIZED, false, 'Invalid token role');
        }
        req.user = (0, Request_DTO_1.toUserAuth)(user);
        next();
    }
    catch (error) {
        const status = error instanceof errorMessages_1.HttpError ? error.statusCode : StatusCodes_1.STATUS_CODE.FORBIDDEN;
        const message = error instanceof Error ? error.message : 'Unknown error';
        logger_1.logger.error(`Failed to verify token: ${message}`);
        (0, sendResponse_1.sendResponse)(res, status, false, message);
    }
}
