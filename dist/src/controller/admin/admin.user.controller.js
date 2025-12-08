var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { inject, injectable } from "inversify";
import { sendResponse } from "../../utils/sendResponse.ts";
import { STATUS_CODE } from "../../utils/StatusCodes.ts";
import { MESSAGES } from "../../utils/ResponseMessages.ts";
let AdminUserController = class AdminUserController {
    _adminService;
    constructor(_adminService) {
        this._adminService = _adminService;
    }
    async addUser(req, res) {
        const data = req.body;
        const user = await this._adminService.addUser(data);
        sendResponse(res, STATUS_CODE.OK, true, MESSAGES.USER_CREATED_SUCCESS, user);
    }
    async getALl(req, res) {
        const data = await this._adminService.getAllUsers();
        sendResponse(res, STATUS_CODE.OK, true, MESSAGES.ALL_DATA_FOUND, data);
    }
};
AdminUserController = __decorate([
    injectable(),
    __param(0, inject('IAdminUserService'))
], AdminUserController);
export { AdminUserController };
//# sourceMappingURL=admin.user.controller.js.map