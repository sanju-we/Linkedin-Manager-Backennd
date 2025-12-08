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
let AdminAuthController = class AdminAuthController {
    constructor(_adminService, _ijwt) {
        this._adminService = _adminService;
        this._ijwt = _ijwt;
    }
    async login(req, res) {
        const data = req.body;
        const result = await this._adminService.verifyLogin(data);
        await this._ijwt.setTokenInCookies(res, result.accessToken, result.refreshToken);
        sendResponse(res, STATUS_CODE.OK, true, MESSAGES.LOGIN_SUCCESS);
    }
};
AdminAuthController = __decorate([
    injectable(),
    __param(0, inject('IAdminAuthService')),
    __param(1, inject('IJWT')),
    __metadata("design:paramtypes", [Object, Object])
], AdminAuthController);
export { AdminAuthController };
//# sourceMappingURL=admin.auth.controller.js.map