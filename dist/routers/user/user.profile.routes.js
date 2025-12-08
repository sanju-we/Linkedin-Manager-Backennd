"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const container_1 = require("../../core/DI/container");
const multer_1 = __importDefault(require("../../middleware/multer"));
const asyncHandler_1 = require("../../middleware/asyncHandler");
const userProfileRouter = (0, express_1.Router)();
const userProfileController = container_1.container.get('IUserProfileController');
// Get user profile
userProfileRouter.get('/getProfile', (0, asyncHandler_1.asyncHandler)(userProfileController.getProfile.bind(userProfileController)));
// Upload image
userProfileRouter.post('/uploadImage', multer_1.default.single('image'), (0, asyncHandler_1.asyncHandler)(userProfileController.uploadImage.bind(userProfileController)));
// Update count
userProfileRouter.post('/updateCount', (0, asyncHandler_1.asyncHandler)(userProfileController.updateCount.bind(userProfileController)));
exports.default = userProfileRouter;
