"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const user_router_1 = __importDefault(require("./routers/user.router"));
const admin_router_1 = __importDefault(require("./routers/admin.router"));
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)();
// app.set("trust proxy", 1);
const originAllowed = ["https://linkedin-manager-beryl.vercel.app", "http://localhost:3000"];
const corsOptions = {
    origin: originAllowed,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    // exposedHeaders: ["Set-Cookie"],
};
app.use((0, cors_1.default)(corsOptions));
app.options("*", (0, cors_1.default)(corsOptions));
// Increase body size limit for file uploads (50MB)
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '50mb' }));
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use('/api/user', user_router_1.default);
app.use('/api/admin', admin_router_1.default);
app.use(errorHandler_1.errorHandler);
function createApp() {
    return app;
}
