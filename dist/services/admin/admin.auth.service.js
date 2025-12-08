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
import { INVALID_CREDENTIAL, InvalidEmail } from "../../utils/errorMessages";
import bcrypt from 'bcrypt';
let AdminAuthService = class AdminAuthService {
    constructor(_authValidator, _userRepo, _adminRepo, _ijwt) {
        this._authValidator = _authValidator;
        this._userRepo = _userRepo;
        this._adminRepo = _adminRepo;
        this._ijwt = _ijwt;
    }
    async verifyLogin(data) {
        await this._authValidator.authValidator(data);
        const existing = await this._adminRepo.findOne({ name: data.name });
        if (!existing)
            throw new InvalidEmail();
        const isMatch = await bcrypt.compare(data.password, existing.password);
        if (!isMatch)
            throw new INVALID_CREDENTIAL();
        const result = await this._ijwt.generateToken({ id: existing._id.toString(), role: existing.role });
        return result;
    }
};
AdminAuthService = __decorate([
    injectable(),
    __param(0, inject('IAuthValidator')),
    __param(1, inject('IUserRepository')),
    __param(2, inject('IAdminRepository')),
    __param(3, inject('IJWT')),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], AdminAuthService);
export { AdminAuthService };
//# sourceMappingURL=admin.auth.service.js.map