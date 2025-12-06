import { IAdmin } from "../../Model/Iadmin.model.ts";

export interface IAdminManageService {
  addAdmin(name:string,password:string):Promise<IAdmin>;
}