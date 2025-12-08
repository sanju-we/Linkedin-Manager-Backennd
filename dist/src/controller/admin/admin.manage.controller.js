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
let AdminManageController = class AdminManageController {
    _adminService;
    constructor(_adminService) {
        this._adminService = _adminService;
    }
    async addAdmin(req, res) {
        const data = req.body;
        const admin = await this._adminService.addAdmin(data.name, data.password);
        sendResponse(res, STATUS_CODE.OK, true, MESSAGES.ADMIN_CREATED_SUCCESSFULLY, admin);
    }
};
AdminManageController = __decorate([
    injectable(),
    __param(0, inject('IAdminManageService'))
], AdminManageController);
export { AdminManageController };
//# sourceMappingURL=admin.manage.controller.js.map