import { IAdminAuthController } from "../../core/Interface/controller/admin/Iadmin.auth.controller";
import { Request, Response } from "express";
import { IAdminAuthService } from "../../core/Interface/service/admin/admin.auth.service";
import { inject, injectable } from "inversify";
import { IJWT } from "../../core/Interface/JWT/IJWT";
import { sendResponse } from "../../utils/sendResponse";
import { STATUS_CODE } from "../../utils/StatusCodes";
import { MESSAGES } from "../../utils/ResponseMessages";

@injectable()
export class AdminAuthController implements IAdminAuthController {
  constructor(
    @inject('IAdminAuthService') private readonly _adminService: IAdminAuthService,
    @inject('IJWT') private readonly _ijwt: IJWT
  ) { }
  async login(req: Request, res: Response): Promise<void> {
    const data = req.body
    const result = await this._adminService.verifyLogin(data)
    await this._ijwt.setTokenInCookies(res, result.accessToken, result.refreshToken)
    sendResponse(res, STATUS_CODE.OK, true, MESSAGES.LOGIN_SUCCESS)
  }

}