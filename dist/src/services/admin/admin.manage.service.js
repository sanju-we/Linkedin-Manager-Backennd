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
import { ALREADY_EXISTS } from "../../utils/errorMessages.ts";
import bcrypt from 'bcrypt';
let AdminManageService = class AdminManageService {
    _authValidator;
    _adminRepo;
    constructor(_authValidator, _adminRepo) {
        this._authValidator = _authValidator;
        this._adminRepo = _adminRepo;
    }
    async addAdmin(name, password) {
        await this._authValidator.authValidator({ name, password });
        const existing = await this._adminRepo.findOne({ name: name });
        if (existing)
            throw new ALREADY_EXISTS();
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = await this._adminRepo.create({ name, password: hashedPassword });
        return admin;
    }
};
AdminManageService = __decorate([
    injectable(),
    __param(0, inject('IAuthValidator')),
    __param(1, inject('IAdminRepository'))
], AdminManageService);
export { AdminManageService };
//# sourceMappingURL=admin.manage.service.js.map