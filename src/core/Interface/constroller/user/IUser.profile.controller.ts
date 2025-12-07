import { Request, Response } from "express";

export interface IUserProfileController {
  getProfile(req:Request, res:Response):Promise<void>;
}