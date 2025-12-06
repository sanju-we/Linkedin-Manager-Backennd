import { IAdminAuthController } from "../../core/Interface/constroller/admin/Iadmin.auth.controller.ts";
import { Request, Response } from "express";
import { IAdminAuthService } from "../../core/Interface/service/admin/admin.auth.service.ts";
import { inject, injectable } from "inversify";
import { IJWT } from "../../core/Interface/JWT/IJWT.ts";
import { sendResponse } from "../../utils/sendResponse.ts";
import { STATUS_CODE } from "../../utils/StatusCodes.ts";
import { MESSAGES } from "../../utils/ResponseMessages.ts";

@injectable()
export class AdminAuthController implements IAdminAuthController {
  constructor(
    @inject('IAdminAuthService') private readonly _adminService : IAdminAuthService,
    @inject('IJWT') private readonly _ijwt : IJWT
  ){}
  async login(req: Request, res: Response): Promise<void> {
    const data = req.body
    const result = await this._adminService.verifyLogin(data)
    await this._ijwt.setTokenInCookies(res,result.accessToken,result.refreshToken)
    sendResponse(res,STATUS_CODE.OK,true,MESSAGES.LOGIN_SUCCESS)
  }
  
}