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
exports.userProfileService = void 0;
const inversify_1 = require("inversify");
const errorMessages_1 = require("../../utils/errorMessages");
const uploadCloudinary_1 = require("../../utils/uploadCloudinary");
let userProfileService = class userProfileService {
    constructor(_userRepo) {
        this._userRepo = _userRepo;
    }
    async getProfile(id) {
        const user = await this._userRepo.findById(id);
        if (!user)
            throw new errorMessages_1.USER_NOT_FOUND();
        return user;
    }
    async uploadImage(id, file) {
        const user = await this._userRepo.findById(id);
        if (!user)
            throw new errorMessages_1.USER_NOT_FOUND();
        const image = await (0, uploadCloudinary_1.singleUpload)(file, 'LINKEDIN_MANAGEMENT');
        if (!user.weeklyLimitPic) {
            user.weeklyLimitPic = [];
        }
        user.weeklyLimitPic.push(image);
        await this._userRepo.update(id, { weeklyLimitPic: user.weeklyLimitPic });
        const updatedUser = await this._userRepo.findById(id);
        if (!updatedUser)
            throw new errorMessages_1.USER_NOT_FOUND();
        return updatedUser;
    }
    async updateCount(id, count) {
        const user = await this._userRepo.findById(id);
        if (!user)
            throw new errorMessages_1.USER_NOT_FOUND();
        const previousCount = user.currentCount || 0;
        let growth = 0;
        if (previousCount > 0) {
            growth = ((count - previousCount) / previousCount) * 100;
        }
        else if (count > 0) {
            growth = 100;
        }
        await this._userRepo.update(id, {
            previousCount: previousCount,
            currentCount: count,
            growth: Math.round(growth * 10) / 10,
        });
        // Fetch updated user
        const updatedUser = await this._userRepo.findById(id);
        if (!updatedUser)
            throw new errorMessages_1.USER_NOT_FOUND();
        return updatedUser;
    }
};
exports.userProfileService = userProfileService;
exports.userProfileService = userProfileService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('IUserRepository')),
    __metadata("design:paramtypes", [Object])
], userProfileService);
//# sourceMappingURL=user.profile.service.js.map