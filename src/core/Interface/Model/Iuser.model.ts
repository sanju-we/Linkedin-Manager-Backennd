import { Document,Types } from "mongoose";

export interface IUser extends Document{
  _id:Types.ObjectId,
  name:string,
  password:string,
  weeklyLimitPic : string[],
  currentCount : number,
  createdAt : Date,
  profile:string,
  linkedAcc : string,
  role:string,
  updatedAt:Date
}