import { IUser } from "../core/Interface/Model/Iuser.model";
import { BaseRepository } from "./Base.repository";
import { User } from "../models/User";
import { IUserRepository } from "../core/Interface/Respository/IUserRepositroty";

export class UserRepository extends BaseRepository<IUser> implements IUserRepository{
  constructor(){
    super(User)
  }
}