import { injectable } from 'inversify';
import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { IJWT } from '../core/Interface/JWT/IJWT'
import { logger } from '../utils/logger';
const getCookieOptions = (maxAge?: number) => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: (process.env.NODE_ENV === "production" ? "none" : "lax") as "none" | "lax" | "strict",
  domain: process.env.NODE_ENV === "production" ? ".jinu.site" : undefined,
  path: "/",
  ...(maxAge ? { maxAge } : {}),
});

@injectable()
export class JWT implements IJWT {
  private readonly JWT_SECRET = process.env.JWT_SECRET || 'your-secret';
  private readonly ACCESS_TOKEN_EXPIRY = '15m';
  private readonly REFRESH_TOKEN_EXPIRY = '7d';
  private readonly jwt = jwt;

//   import { env } from "@config/env";



  async setTokenInCookies(res: Response, accessToken: string, refreshToken: string): Promise<void> {
    res.cookie('accessToken', accessToken, getCookieOptions(24 * 60 * 60 * 1000));
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      partitioned: true,
      path: "/",
    });

  }

  async generateToken(payload: { id: string; role: string }): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    try {
      const accessToken = jwt.sign(payload, this.JWT_SECRET, {
        expiresIn: this.ACCESS_TOKEN_EXPIRY,
      });
      const refreshToken = jwt.sign(payload, this.JWT_SECRET, {
        expiresIn: this.REFRESH_TOKEN_EXPIRY,
      });
      logger.info(`accessToken from JWT->generateToken : ${accessToken}`);
      return { accessToken, refreshToken };
    } catch (err: any) {
      logger.error(`From JWT->generateToken:- Failed to generate JWT: ${err.message}`);
      throw new Error('Failed to generate tokens');
    }
  }

  async blacklistRefreshToken(res: Response): Promise<{ res: Response }> {
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });
    return { res };
  }

  async verifyRefreshToken(refreshToken: string): Promise<{ id: string; role: string }> {
    logger.info(`userId:${refreshToken}`);
    const decoded: { id: string; role: string } = JSON.parse(
      JSON.stringify(jwt.verify(refreshToken, this.JWT_SECRET)),
    );
    logger.info(`decoded :${decoded}`);
    return decoded;
  }

  async verify(accessToken: string): Promise<{ id: string; email: string }> {
    const payload = jwt.verify(accessToken, this.JWT_SECRET) as { id: string; email: string };
    return payload;
  }
}
