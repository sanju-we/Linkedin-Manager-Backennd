import { Request, Response } from "express";
import { IUserAuthController } from "../../core/Interface/constroller/user/Iuser.auth.controller.ts";
import { inject, injectable } from "inversify";
import type { IUserAUthService } from "../../core/Interface/service/user/IUser.auth.service.ts";
import type { IJWT } from "../../core/Interface/JWT/IJWT.ts";
import { sendResponse } from "../../utils/sendResponse.ts";
import { STATUS_CODE } from "../../utils/StatusCodes.ts";
import { MESSAGES } from "../../utils/ResponseMessages.ts";
import { logger } from "../../utils/logger.ts";

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
    sendResponse(res, STATUS_CODE.OK, true, MESSAGES.LOGIN_SUCCESS)
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