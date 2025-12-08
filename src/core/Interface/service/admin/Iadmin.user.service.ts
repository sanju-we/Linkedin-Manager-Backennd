import { IUser } from "../../Model/Iuser.model";

export interface IAdminUserService {
  addUser(data:{name:string,password:string,linkedAcc:string}):Promise<IUser>;
  getAllUsers():Promise<IUser[]>;
  getUser(userId:string):Promise<IUser>;
}