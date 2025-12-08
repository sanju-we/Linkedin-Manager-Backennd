import { Request, Response } from "express";

export interface IUserProfileController {
  getProfile(req: Request, res: Response): Promise<void>;
  uploadImage(req: Request, res: Response): Promise<void>;
  updateCount(req: Request, res: Response): Promise<void>;
}
