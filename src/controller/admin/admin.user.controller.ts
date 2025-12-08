import { Request, Response } from "express";
import { IAdminUserController } from "../../core/Interface/controller/admin/Iadmin.user.controller";
import { IAdminUserService } from "../../core/Interface/service/admin/Iadmin.user.service";
import { inject, injectable } from "inversify";
import { sendResponse } from "../../utils/sendResponse";
import { STATUS_CODE } from "../../utils/StatusCodes";
import { MESSAGES } from "../../utils/ResponseMessages";
import { BAD_REQUEST } from "../../utils/errorMessages";

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

  async getUser(req: Request, res: Response): Promise<void> {
      const userId = req.params.id
      if(!userId) throw new BAD_REQUEST("User id is not there")
      const user = await this._adminService.getUser(userId)
      sendResponse(res,STATUS_CODE.OK,true,MESSAGES.DATA_FOUND,user)
  }
}