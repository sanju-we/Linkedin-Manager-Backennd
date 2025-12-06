import { IUser } from "../core/Interface/Model/Iuser.model.ts";
import { Schema,model } from "mongoose";

const userSchema = new Schema<IUser>({
  name:{type:String,required:true,unique:true},
  password:{type:String,requires:true,},
  weeklyLimitPic:{type:[String]},
  currentCount:{type:Number},
  createdAt:{type:Date},
  profile:{type:String},
  linkedAcc:{type:String},
  role:{type:String,default:'user'},
  updatedAt:{type:Date}
},{timestamps:true})

export const User = model<IUser>('User',userSchema)