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
exports.AdminAuthController = void 0;
const inversify_1 = require("inversify");
const sendResponse_1 = require("../../utils/sendResponse");
const StatusCodes_1 = require("../../utils/StatusCodes");
const ResponseMessages_1 = require("../../utils/ResponseMessages");
let AdminAuthController = class AdminAuthController {
    constructor(_adminService, _ijwt) {
        this._adminService = _adminService;
        this._ijwt = _ijwt;
    }
    async login(req, res) {
        const data = req.body;
        const result = await this._adminService.verifyLogin(data);
        await this._ijwt.setTokenInCookies(res, result.accessToken, result.refreshToken);
        (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODE.OK, true, ResponseMessages_1.MESSAGES.LOGIN_SUCCESS);
    }
};
exports.AdminAuthController = AdminAuthController;
exports.AdminAuthController = AdminAuthController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('IAdminAuthService')),
    __param(1, (0, inversify_1.inject)('IJWT')),
    __metadata("design:paramtypes", [Object, Object])
], AdminAuthController);
