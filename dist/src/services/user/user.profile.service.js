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
import { USER_NOT_FOUND } from "../../utils/errorMessages.ts";
import { singleUpload } from "../../utils/uploadCloudinary.ts";
let userProfileService = class userProfileService {
    _userRepo;
    constructor(_userRepo) {
        this._userRepo = _userRepo;
    }
    async getProfile(id) {
        const user = await this._userRepo.findById(id);
        if (!user)
            throw new USER_NOT_FOUND();
        return user;
    }
    async uploadImage(id, file) {
        const user = await this._userRepo.findById(id);
        if (!user)
            throw new USER_NOT_FOUND();
        const image = await singleUpload(file, 'LINKEDIN_MANAGEMENT');
        // Initialize weeklyLimitPic if it doesn't exist
        if (!user.weeklyLimitPic) {
            user.weeklyLimitPic = [];
        }
        user.weeklyLimitPic.push(image);
        await this._userRepo.update(id, { weeklyLimitPic: user.weeklyLimitPic });
        // Fetch updated user
        const updatedUser = await this._userRepo.findById(id);
        if (!updatedUser)
            throw new USER_NOT_FOUND();
        return updatedUser;
    }
    async updateCount(id, count) {
        const user = await this._userRepo.findById(id);
        if (!user)
            throw new USER_NOT_FOUND();
        // Calculate growth based on previous count
        const previousCount = user.currentCount || 0;
        let growth = 0;
        if (previousCount > 0) {
            // Calculate percentage growth
            growth = ((count - previousCount) / previousCount) * 100;
        }
        else if (count > 0) {
            // If previous count was 0 and new count is positive, set growth to 100%
            growth = 100;
        }
        await this._userRepo.update(id, {
            currentCount: count,
            growth: Math.round(growth * 10) / 10, // Round to 1 decimal place
        });
        // Fetch updated user
        const updatedUser = await this._userRepo.findById(id);
        if (!updatedUser)
            throw new USER_NOT_FOUND();
        return updatedUser;
    }
};
userProfileService = __decorate([
    injectable(),
    __param(0, inject('IUserRepository'))
], userProfileService);
export { userProfileService };
//# sourceMappingURL=user.profile.service.js.map