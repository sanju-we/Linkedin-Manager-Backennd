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
import { BAD_REQUEST } from "../../utils/errorMessages";
import { logger } from "../../utils/logger";
let UserProfileController = class UserProfileController {
    constructor(_userService) {
        this._userService = _userService;
    }
    async getProfile(req, res) {
        const userId = req.user.id;
        const user = await this._userService.getProfile(userId);
        sendResponse(res, STATUS_CODE.OK, true, MESSAGES.DATA_FOUND, user);
    }
    async uploadImage(req, res) {
        logger.info('Uploading image');
        logger.info(`userId = ${req.user.id}`);
        const userId = req.user.id;
        logger.info(`file = ${JSON.stringify(req.file)}`);
        const file = req.file;
        if (!file) {
            logger.info('File not found');
            throw new BAD_REQUEST(MESSAGES.FILE_NOT_FOUND);
        }
        logger.info('File found');
        const user = await this._userService.uploadImage(userId, file);
        sendResponse(res, STATUS_CODE.OK, true, MESSAGES.DATA_FOUND, user);
    }
    async updateCount(req, res) {
        logger.info('Updating count');
        const userId = req.user.id;
        const { count } = req.body;
        // Validate count
        if (typeof count !== 'number' || count < 0 || !Number.isInteger(count)) {
            throw new BAD_REQUEST('Count must be a non-negative integer');
        }
        const user = await this._userService.updateCount(userId, count);
        sendResponse(res, STATUS_CODE.OK, true, "Count updated successfully", user);
    }
};
UserProfileController = __decorate([
    injectable(),
    __param(0, inject('IuserProfileService')),
    __metadata("design:paramtypes", [Object])
], UserProfileController);
export { UserProfileController };
//# sourceMappingURL=user.profile.controller.js.map