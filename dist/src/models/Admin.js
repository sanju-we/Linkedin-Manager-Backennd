import { Schema, model } from "mongoose";
const adminSchema = new Schema({
    name: { type: String },
    password: { type: String },
    role: { type: String, default: 'admin' }
});
export const Admin = model('Admin', adminSchema);
//# sourceMappingURL=Admin.js.map