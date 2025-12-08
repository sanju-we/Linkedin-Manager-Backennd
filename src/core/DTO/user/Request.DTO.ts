import { IAdmin } from "../../Interface/Model/Iadmin.model"
import { IUser } from "../../Interface/Model/Iuser.model"

export interface userAuth{
  id:string,
  name:string,
  role:string
}

export const toUserAuth = (user:IUser | IAdmin):userAuth => ({
  id:user._id.toString(),
  name:user.name,
  role:user.role
})