import { Document,Types } from "mongoose";

export interface IAdmin extends Document{
  _id:Types.ObjectId,
  name:string,
  password:string,
  role:string
}