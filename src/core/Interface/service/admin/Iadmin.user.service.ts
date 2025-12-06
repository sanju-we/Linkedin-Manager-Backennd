import { IUser } from "../../Model/Iuser.model.ts";

export interface IAdminUserService {
  addUser(data:{name:string,password:string,linkedAcc:string}):Promise<IUser>;
  getAllUsers():Promise<IUser[]>
}