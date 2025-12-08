import { Request, Response } from "express";
import { IUserAuthController } from "../../core/Interface/controller/user/Iuser.auth.controller";
import { inject, injectable } from "inversify";
import type { IUserAUthService } from "../../core/Interface/service/user/IUser.auth.service";
import type { IJWT } from "../../core/Interface/JWT/IJWT";
import { sendResponse } from "../../utils/sendResponse";
import { STATUS_CODE } from "../../utils/StatusCodes";
import { MESSAGES } from "../../utils/ResponseMessages";
import { logger } from "../../utils/logger";

@injectable()
export class userAuthController implements IUserAuthController {
  constructor(
    @inject('IUserAUthService') private readonly _userService: IUserAUthService,
    @inject('IJWT') private readonly _ijwt: IJWT
  ) { }
  async login(req: Request, res: Response): Promise<void> {
    const data = req.body
    const result = await this._userService.verify(data)
    await this._ijwt.setTokenInCookies(res, result.accessToken, result.refreshToken)
    res.status(200).json({
    success: true,
    message: MESSAGES.LOGIN_SUCCESS,
  });
  }

  async logout(req: Request, res: Response): Promise<void> {
    await this._ijwt.blacklistRefreshToken(res)
    sendResponse(res, STATUS_CODE.OK, true, MESSAGES.LOGOUT_SUCCESS)
  }

  async refreshToken(req: Request, res: Response): Promise<void> {
    const refreshToken = req.cookies.refreshToken
    logger.info(`refreshToken = ${refreshToken}`)
    const result = await this._ijwt.verifyRefreshToken(refreshToken)
    const accessToken = await this._ijwt.generateToken({ id: result.id, role: result.role })
    await this._ijwt.setTokenInCookies(res, accessToken.accessToken, accessToken.refreshToken)
    sendResponse(res, STATUS_CODE.OK, true, MESSAGES.REFRESH_TOKEN_SUCCESS)
  }
}