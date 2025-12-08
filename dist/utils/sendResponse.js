"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = sendResponse;
function sendResponse(res, status, success, message, data) {
    res.status(status).json({ success, message, data });
}
