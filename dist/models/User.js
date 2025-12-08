"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    password: { type: String, requires: true, },
    weeklyLimitPic: { type: [String] },
    growth: { type: Number },
    previousCount: { type: Number },
    currentCount: { type: Number },
    createdAt: { type: Date },
    profile: { type: String },
    linkedAcc: { type: String },
    role: { type: String, default: 'user' },
    updatedAt: { type: Date }
}, { timestamps: true });
exports.User = (0, mongoose_1.model)('User', userSchema);
//# sourceMappingURL=User.js.map