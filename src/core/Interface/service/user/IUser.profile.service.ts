import { IUser } from "../../Model/Iuser.model.ts";

export interface IuserProfileService {
  getProfile(id:string):Promise<IUser>
}