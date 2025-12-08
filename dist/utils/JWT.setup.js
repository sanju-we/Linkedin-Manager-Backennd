var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import { logger } from '../utils/logger';
let JWT = class JWT {
    constructor() {
        this.JWT_SECRET = process.env.JWT_SECRET || 'your-secret';
        this.ACCESS_TOKEN_EXPIRY = '15m';
        this.REFRESH_TOKEN_EXPIRY = '7d';
        this.jwt = jwt;
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
            const accessToken = jwt.sign(payload, this.JWT_SECRET, {
                expiresIn: this.ACCESS_TOKEN_EXPIRY,
            });
            const refreshToken = jwt.sign(payload, this.JWT_SECRET, {
                expiresIn: this.REFRESH_TOKEN_EXPIRY,
            });
            logger.info(`accessToken from JWT->generateToken : ${accessToken}`);
            return { accessToken, refreshToken };
        }
        catch (err) {
            logger.error(`From JWT->generateToken:- Failed to generate JWT: ${err.message}`);
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
        logger.info(`userId:${refreshToken}`);
        const decoded = JSON.parse(JSON.stringify(jwt.verify(refreshToken, this.JWT_SECRET)));
        logger.info(`decoded :${decoded}`);
        return decoded;
    }
    async verify(accessToken) {
        const payload = jwt.verify(accessToken, this.JWT_SECRET);
        return payload;
    }
};
JWT = __decorate([
    injectable()
], JWT);
export { JWT };
//# sourceMappingURL=JWT.setup.js.map