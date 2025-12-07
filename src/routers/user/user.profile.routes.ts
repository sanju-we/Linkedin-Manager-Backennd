import { Router } from "express";
import { IUserProfileController } from "../../core/Interface/constroller/user/IUser.profile.controller.ts";
import { container } from "../../core/DI/container.ts";
import upload from "../../middleware/multer.ts";
import { asyncHandler } from "../../middleware/asyncHandler.ts";

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
