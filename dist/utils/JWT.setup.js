"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT = void 0;
const inversify_1 = require("inversify");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = require("../utils/logger");
let JWT = class JWT {
    constructor() {
        this.JWT_SECRET = process.env.JWT_SECRET || 'your-secret';
        this.ACCESS_TOKEN_EXPIRY = '15m';
        this.REFRESH_TOKEN_EXPIRY = '7d';
        this.jwt = jsonwebtoken_1.default;
    }
    async setTokenInCookies(res, accessToken, refreshToken) {
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        });
    }
    async generateToken(payload) {
        try {
            const accessToken = jsonwebtoken_1.default.sign(payload, this.JWT_SECRET, {
                expiresIn: this.ACCESS_TOKEN_EXPIRY,
            });
            const refreshToken = jsonwebtoken_1.default.sign(payload, this.JWT_SECRET, {
                expiresIn: this.REFRESH_TOKEN_EXPIRY,
            });
            logger_1.logger.info(`accessToken from JWT->generateToken : ${accessToken}`);
            return { accessToken, refreshToken };
        }
        catch (err) {
            logger_1.logger.error(`From JWT->generateToken:- Failed to generate JWT: ${err.message}`);
            throw new Error('Failed to generate tokens');
        }
    }
    async blacklistRefreshToken(res) {
        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        });
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        });
        return { res };
    }
    async verifyRefreshToken(refreshToken) {
        logger_1.logger.info(`userId:${refreshToken}`);
        const decoded = JSON.parse(JSON.stringify(jsonwebtoken_1.default.verify(refreshToken, this.JWT_SECRET)));
        logger_1.logger.info(`decoded :${decoded}`);
        return decoded;
    }
    async verify(accessToken) {
        const payload = jsonwebtoken_1.default.verify(accessToken, this.JWT_SECRET);
        return payload;
    }
};
exports.JWT = JWT;
exports.JWT = JWT = __decorate([
    (0, inversify_1.injectable)()
], JWT);
//# sourceMappingURL=JWT.setup.js.map