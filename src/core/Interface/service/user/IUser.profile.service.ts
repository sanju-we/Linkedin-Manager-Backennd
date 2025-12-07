import { IUser } from "../../Model/Iuser.model.ts";

export interface IuserProfileService {
  getProfile(id: string): Promise<IUser>;
  uploadImage(id: string, file: Express.Multer.File): Promise<IUser>;
  updateCount(id: string, count: number): Promise<IUser>;
}
