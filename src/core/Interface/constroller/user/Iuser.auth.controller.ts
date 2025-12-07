import { Request,Response } from "express";

export interface IUserAuthController {
  login(req:Request,res:Response):Promise<void>;
  logout(req:Request,res:Response):Promise<void>;
  refreshToken(req:Request,res:Response):Promise<void>;
}