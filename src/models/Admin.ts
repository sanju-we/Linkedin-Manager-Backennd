import { Schema,model } from "mongoose";
import { IAdmin } from "../core/Interface/Model/Iadmin.model.ts";

const adminSchema = new Schema<IAdmin>({
  name:{type:String},
  password:{type:String},
  role:{type:String,default:'admin'}
})

export const Admin = model<IAdmin>('Admin',adminSchema)