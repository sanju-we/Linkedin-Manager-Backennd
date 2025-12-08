"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const mongoose_1 = require("mongoose");
const adminSchema = new mongoose_1.Schema({
    name: { type: String },
    password: { type: String },
    role: { type: String, default: 'admin' }
});
exports.Admin = (0, mongoose_1.model)('Admin', adminSchema);
