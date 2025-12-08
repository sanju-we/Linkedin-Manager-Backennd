"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserAuth = void 0;
const toUserAuth = (user) => ({
    id: user._id.toString(),
    name: user.name,
    role: user.role
});
exports.toUserAuth = toUserAuth;
