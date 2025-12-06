import { Request, Response } from "express";
import { IUserAuthController } from "../../core/Interface/constroller/user/Iuser.auth.controller.ts";
import { inject, injectable } from "inversify";
import { IUserAUthService } from "../../core/Interface/service/user/IUser.auth.service.ts";
import { IJWT } from "../../core/Interface/JWT/IJWT.ts";
import { sendResponse } from "../../utils/sendResponse.ts";
import { STATUS_CODE } from "../../utils/StatusCodes.ts";
import { MESSAGES } from "../../utils/ResponseMessages.ts";

@injectable()
export class userAuthController implements IUserAuthController {
  constructor(
    @inject('IUserAUthService') private readonly _userService : IUserAUthService,
    @inject('IJWT') private readonly _ijwt : IJWT
  ) { }
  async login(req: Request, res: Response): Promise<void> {
    const data = req.body
    const result = await this._userService.verify(data)
    await this._ijwt.setTokenInCookies(res,result.accessToken,result.refreshToken)
    sendResponse(res,STATUS_CODE.OK,true,MESSAGES.LOGIN_SUCCESS)
  }
}