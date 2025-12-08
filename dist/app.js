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
// CORS configuration - flexible for development
const corsOptions = {
    origin: (origin, callback) => {
        const allowedOrigins = [
            'http://localhost:3000',
            'https://linkedin-manager-tawny.vercel.app',
        ];
        if (process.env.NODE_ENV === 'development') {
            if (!origin) {
                return callback(null, true);
            }
            if (/^http:\/\/localhost:\d+$/.test(origin)) {
                return callback(null, true);
            }
            if (/^http:\/\/(192\.168\.\d+\.\d+|172\.(1[6-9]|2\d|3[01])\.\d+\.\d+|10\.\d+\.\d+\.\d+):\d+$/.test(origin)) {
                console.log(`CORS: Allowing origin in development: ${origin}`);
                return callback(null, true);
            }
        }
        if (origin && allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        if (process.env.NODE_ENV === 'development') {
            console.warn(`CORS: Allowing origin in development (fallback): ${origin}`);
            return callback(null, true);
        }
        callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
};
app.use((0, cors_1.default)(corsOptions));
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
//# sourceMappingURL=app.js.map