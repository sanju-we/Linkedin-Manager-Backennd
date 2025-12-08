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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuthService = void 0;
const inversify_1 = require("inversify");
const errorMessages_1 = require("../../utils/errorMessages");
const bcrypt_1 = __importDefault(require("bcrypt"));
let userAuthService = class userAuthService {
    constructor(_userValidator, _userRepo, _ijwt) {
        this._userValidator = _userValidator;
        this._userRepo = _userRepo;
        this._ijwt = _ijwt;
    }
    async verify(data) {
        await this._userValidator.authValidator(data);
        const user = await this._userRepo.findOne({ name: data.name });
        if (!user)
            throw new errorMessages_1.InvalidEmail();
        const isMatch = await bcrypt_1.default.compare(data.password, user.password);
        if (!isMatch)
            throw new errorMessages_1.INVALID_CREDENTIAL();
        const result = await this._ijwt.generateToken({ id: user._id.toString(), role: user.role });
        return result;
    }
};
exports.userAuthService = userAuthService;
exports.userAuthService = userAuthService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('IAuthValidator')),
    __param(1, (0, inversify_1.inject)('IUserRepository')),
    __param(2, (0, inversify_1.inject)('IJWT')),
    __metadata("design:paramtypes", [Object, Object, Object])
], userAuthService);
