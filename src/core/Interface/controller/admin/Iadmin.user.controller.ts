import { Request, Response } from "express";

export interface IAdminUserController {
  addUser(req:Request,res:Response):Promise<void>;
  getALl(req:Request,res:Response):Promise<void>;
  getUser(req:Request,res:Response):Promise<void>
}