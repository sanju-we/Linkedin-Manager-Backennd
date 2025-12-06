import { Request,Response } from "express";

export interface IUserAuthController {
  login(req:Request,res:Response):Promise<void>;
}