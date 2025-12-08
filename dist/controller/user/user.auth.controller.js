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
import { inject, injectable } from "inversify";
import { sendResponse } from "../../utils/sendResponse";
import { STATUS_CODE } from "../../utils/StatusCodes";
import { MESSAGES } from "../../utils/ResponseMessages";
import { logger } from "../../utils/logger";
let userAuthController = class userAuthController {
    constructor(_userService, _ijwt) {
        this._userService = _userService;
        this._ijwt = _ijwt;
    }
    async login(req, res) {
        const data = req.body;
        const result = await this._userService.verify(data);
        await this._ijwt.setTokenInCookies(res, result.accessToken, result.refreshToken);
        sendResponse(res, STATUS_CODE.OK, true, MESSAGES.LOGIN_SUCCESS);
    }
    async logout(req, res) {
        await this._ijwt.blacklistRefreshToken(res);
        sendResponse(res, STATUS_CODE.OK, true, MESSAGES.LOGOUT_SUCCESS);
    }
    async refreshToken(req, res) {
        const refreshToken = req.cookies.refreshToken;
        logger.info(`refreshToken = ${refreshToken}`);
        const result = await this._ijwt.verifyRefreshToken(refreshToken);
        const accessToken = await this._ijwt.generateToken({ id: result.id, role: result.role });
        await this._ijwt.setTokenInCookies(res, accessToken.accessToken, accessToken.refreshToken);
        sendResponse(res, STATUS_CODE.OK, true, MESSAGES.REFRESH_TOKEN_SUCCESS);
    }
};
userAuthController = __decorate([
    injectable(),
    __param(0, inject('IUserAUthService')),
    __param(1, inject('IJWT')),
    __metadata("design:paramtypes", [Object, Object])
], userAuthController);
export { userAuthController };
//# sourceMappingURL=user.auth.controller.js.map