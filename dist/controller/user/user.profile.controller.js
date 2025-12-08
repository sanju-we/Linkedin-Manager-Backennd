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
exports.UserProfileController = void 0;
const inversify_1 = require("inversify");
const sendResponse_1 = require("../../utils/sendResponse");
const StatusCodes_1 = require("../../utils/StatusCodes");
const ResponseMessages_1 = require("../../utils/ResponseMessages");
const errorMessages_1 = require("../../utils/errorMessages");
const logger_1 = require("../../utils/logger");
let UserProfileController = class UserProfileController {
    constructor(_userService) {
        this._userService = _userService;
    }
    async getProfile(req, res) {
        const userId = req.user.id;
        const user = await this._userService.getProfile(userId);
        (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODE.OK, true, ResponseMessages_1.MESSAGES.DATA_FOUND, user);
    }
    async uploadImage(req, res) {
        logger_1.logger.info('Uploading image');
        logger_1.logger.info(`userId = ${req.user.id}`);
        const userId = req.user.id;
        logger_1.logger.info(`file = ${JSON.stringify(req.file)}`);
        const file = req.file;
        if (!file) {
            logger_1.logger.info('File not found');
            throw new errorMessages_1.BAD_REQUEST(ResponseMessages_1.MESSAGES.FILE_NOT_FOUND);
        }
        logger_1.logger.info('File found');
        const user = await this._userService.uploadImage(userId, file);
        (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODE.OK, true, ResponseMessages_1.MESSAGES.DATA_FOUND, user);
    }
    async updateCount(req, res) {
        logger_1.logger.info('Updating count');
        const userId = req.user.id;
        const { count } = req.body;
        // Validate count
        if (typeof count !== 'number' || count < 0 || !Number.isInteger(count)) {
            throw new errorMessages_1.BAD_REQUEST('Count must be a non-negative integer');
        }
        const user = await this._userService.updateCount(userId, count);
        (0, sendResponse_1.sendResponse)(res, StatusCodes_1.STATUS_CODE.OK, true, "Count updated successfully", user);
    }
};
exports.UserProfileController = UserProfileController;
exports.UserProfileController = UserProfileController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('IuserProfileService')),
    __metadata("design:paramtypes", [Object])
], UserProfileController);
