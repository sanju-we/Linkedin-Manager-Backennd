import { Request, Response } from "express";
import { IUserProfileController } from "../../core/Interface/constroller/user/IUser.profile.controller.ts";
import { IuserProfileService } from "../../core/Interface/service/user/IUser.profile.service.ts";
import { inject, injectable } from "inversify";
import { sendResponse } from "../../utils/sendResponse.ts";
import { STATUS_CODE } from "../../utils/StatusCodes.ts";
import { MESSAGES } from "../../utils/ResponseMessages.ts";

@injectable()
export class UserProfileController implements IUserProfileController {
  constructor(
    @inject('IuserProfileService') private readonly _userService: IuserProfileService
  ) { }
  async getProfile(req: Request, res: Response): Promise<void> {
    const userId = req.user.id
    const user = await this._userService.getProfile(userId)
    sendResponse(res, STATUS_CODE.OK, true, MESSAGES.DATA_FOUND, user)
  }
}