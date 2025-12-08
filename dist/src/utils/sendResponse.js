export function sendResponse(res, status, success, message, data) {
    res.status(status).json({ success, message, data });
}
//# sourceMappingURL=sendResponse.js.map