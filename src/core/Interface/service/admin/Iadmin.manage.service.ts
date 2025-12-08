import { IAdmin } from "../../Model/Iadmin.model";

export interface IAdminManageService {
  addAdmin(name:string,password:string):Promise<IAdmin>;
}