"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuthController = void 0;
const inversify_1 = require("inversify");
const sendResponse_1 = require("../../utils/sendResponse");
const StatusCodes_1 = require("../../utils/StatusCodes");
const ResponseMessages_1 = require("../../utils/ResponseMessages");
const logger_1 = require("../../utils/logger");
let userAuthController = class userAuthController {
    constructor(_userService, _ijwt) {
        this._userService = _userService;
        this._ijwt = _ijwt;
    }
    async login(req, res) {
        const data = req.body;
        const result = await this._userService.verify(data);
        await this._ijwt.setTokenInCookies(res, result.accessToken, result.refreshToken);
        res.status(200).json({
            success: true,
            message: ResponseMessages_1.MESSAGES.LOGIN_SUCCESS,
        });
    }
    async logout(req, res) {
        await this._ijwt.blacklistRefreshToken(res);
        (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODE.OK, true, ResponseMessages_1.MESSAGES.LOGOUT_SUCCESS);
    }
    async refreshToken(req, res) {
        const refreshToken = req.cookies.refreshToken;
        logger_1.logger.info(`refreshToken = ${refreshToken}`);
        const result = await this._ijwt.verifyRefreshToken(refreshToken);
        const accessToken = await this._ijwt.generateToken({ id: result.id, role: result.role });
        await this._ijwt.setTokenInCookies(res, accessToken.accessToken, accessToken.refreshToken);
        (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODE.OK, true, ResponseMessages_1.MESSAGES.REFRESH_TOKEN_SUCCESS);
    }
};
exports.userAuthController = userAuthController;
exports.userAuthController = userAuthController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('IUserAUthService')),
    __param(1, (0, inversify_1.inject)('IJWT')),
    __metadata("design:paramtypes", [Object, Object])
], userAuthController);
