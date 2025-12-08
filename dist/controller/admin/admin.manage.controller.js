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
let AdminManageController = class AdminManageController {
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
    __param(0, inject('IAdminManageService')),
    __metadata("design:paramtypes", [Object])
], AdminManageController);
export { AdminManageController };
//# sourceMappingURL=admin.manage.controller.js.map