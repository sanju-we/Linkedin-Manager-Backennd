import { IUser } from "../../Interface/Model/Iuser.model.ts"

export interface userAuth{
  id:string,
  name:string,
  role:string
}

export const toUserAuth = (user:IUser):userAuth => ({
  id:user._id.toString(),
  name:user.name,
  role:user.role
})