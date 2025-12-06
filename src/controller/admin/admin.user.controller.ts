import { Request, Response } from "express";
import { IAdminUserController } from "../../core/Interface/constroller/admin/Iadmin.user.controller.ts";
import { IAdminUserService } from "../../core/Interface/service/admin/Iadmin.user.service.ts";
import { inject, injectable } from "inversify";
import { sendResponse } from "../../utils/sendResponse.ts";
import { STATUS_CODE } from "../../utils/StatusCodes.ts";
import { MESSAGES } from "../../utils/ResponseMessages.ts";

@injectable()
export class AdminUserController implements IAdminUserController {
  constructor(
    @inject('IAdminUserService') private readonly _adminService : IAdminUserService
  ){}
  async addUser(req: Request, res: Response): Promise<void> {
    const data = req.body
    const user = await this._adminService.addUser(data)
    sendResponse(res,STATUS_CODE.OK,true,MESSAGES.USER_CREATED_SUCCESS,user)
  }

  async getALl(req: Request, res: Response): Promise<void> {
      const data = await this._adminService.getAllUsers()
      sendResponse(res,STATUS_CODE.OK,true,MESSAGES.ALL_DATA_FOUND,data)
  }
}