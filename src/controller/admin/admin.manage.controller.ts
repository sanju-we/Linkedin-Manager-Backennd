import { Request, Response } from "express";
import { IAdminManageController } from "../../core/Interface/constroller/admin/Iadmin.adminM.controller.ts";
import { IAdminManageService } from "../../core/Interface/service/admin/Iadmin.manage.service.ts";
import { inject, injectable } from "inversify";
import { sendResponse } from "../../utils/sendResponse.ts";
import { STATUS_CODE } from "../../utils/StatusCodes.ts";
import { MESSAGES } from "../../utils/ResponseMessages.ts";

@injectable()
export class AdminManageController implements IAdminManageController{
  constructor(
    @inject('IAdminManageService') private readonly _adminService : IAdminManageService
  ){}
  async addAdmin(req: Request, res: Response): Promise<void> {
      const data = req.body;
      const admin = await this._adminService.addAdmin(data.name,data.password)
      sendResponse(res,STATUS_CODE.OK,true,MESSAGES.ADMIN_CREATED_SUCCESSFULLY,admin)
  }
}