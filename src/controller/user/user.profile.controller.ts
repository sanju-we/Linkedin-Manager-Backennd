import { Request, Response } from "express";
import { IUserProfileController } from "../../core/Interface/controller/user/IUser.profile.controller";
import { IuserProfileService } from "../../core/Interface/service/user/IUser.profile.service";
import { inject, injectable } from "inversify";
import { sendResponse } from "../../utils/sendResponse";
import { STATUS_CODE } from "../../utils/StatusCodes";
import { MESSAGES } from "../../utils/ResponseMessages";
import { BAD_REQUEST } from "../../utils/errorMessages";
import { logger } from "../../utils/logger";

@injectable()
export class UserProfileController implements IUserProfileController {
  constructor(
    @inject('IuserProfileService') private readonly _userService: IuserProfileService
  ) { }
  
  async getProfile(req: Request, res: Response): Promise<void> {
    const userId = req.user.id;
    const user = await this._userService.getProfile(userId);
    sendResponse(res, STATUS_CODE.OK, true, MESSAGES.DATA_FOUND, user);
  }

  async uploadImage(req: Request, res: Response): Promise<void> {
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

  async updateCount(req: Request, res: Response): Promise<void> {
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
}
