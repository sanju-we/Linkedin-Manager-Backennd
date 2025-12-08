import { Router } from "express";
import { IUserProfileController } from "../../core/Interface/controller/user/IUser.profile.controller.js";
import { container } from "../../core/DI/container";
import upload from "../../middleware/multer";
import { asyncHandler } from "../../middleware/asyncHandler";

const userProfileRouter = Router();
const userProfileController = container.get<IUserProfileController>('IUserProfileController');

// Get user profile
userProfileRouter.get(
  '/getProfile',
  asyncHandler(userProfileController.getProfile.bind(userProfileController))
);

// Upload image
userProfileRouter.post(
  '/uploadImage',
  upload.single('image'),
  asyncHandler(userProfileController.uploadImage.bind(userProfileController))
);

// Update count
userProfileRouter.post(
  '/updateCount',
  asyncHandler(userProfileController.updateCount.bind(userProfileController))
);

export default userProfileRouter;
