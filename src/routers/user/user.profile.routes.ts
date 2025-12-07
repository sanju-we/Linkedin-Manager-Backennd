import { Router } from "express";
import { IUserProfileController } from "../../core/Interface/constroller/user/IUser.profile.controller.ts";
import { container } from "../../core/DI/container.ts";

const userProfileRouter = Router()
const userProfileController = container.get<IUserProfileController>('IUserProfileController')

userProfileRouter.get('/getProfile',userProfileController.getProfile.bind(userProfileController))

export default userProfileRouter