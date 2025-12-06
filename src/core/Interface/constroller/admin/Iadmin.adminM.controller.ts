import { Request, Response } from "express";

export interface IAdminManageController {
  addAdmin(req:Request,res:Response):Promise<void>;
}