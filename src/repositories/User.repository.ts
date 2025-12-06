import { IUser } from "../core/Interface/Model/Iuser.model.ts";
import { BaseRepository } from "./Base.repository.ts";
import { User } from "../models/User.ts";
import { IUserRepository } from "../core/Interface/Respository/IUserRepositroty.ts";

export class UserRepository extends BaseRepository<IUser> implements IUserRepository{
  constructor(){
    super(User)
  }
}