import { IUser } from "../Model/Iuser.model.ts";
import { IBaseRepository } from "./IBaseRepositrory.ts";

export interface IUserRepository extends IBaseRepository<IUser>{
  
}