import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/errorMessages.ts";
import { sendResponse } from "../utils/sendResponse.ts";
import { STATUS_CODE } from "../utils/StatusCodes.ts";
import { User } from "../models/User.ts";
import { JWT } from "../utils/JWT.setup.ts";
import { logger } from "../utils/logger.ts";
import jwt from "jsonwebtoken";
import { toUserAuth } from "../core/DTO/user/Request.DTO.ts";

const ijwt = new JWT()
const secret = process.env.JWT_SECRET || 'Linkedin@323';

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers['authorization'];
    const token =
      authHeader && authHeader.startsWith('Bearer ')
        ? authHeader.split(' ')[1]
        : req.cookies?.accessToken;
    if (!token) {
      return sendResponse(res, STATUS_CODE.FORBIDDEN, false, 'Access restricted, login first');
    }
    const payload = jwt.verify(token, secret) as { id: string; role: string };
    if (!payload) return sendResponse(res, STATUS_CODE.FORBIDDEN, false, 'Token expired');

    const user = await User.findById(payload.id);
    if (!user) {
      ijwt.blacklistRefreshToken(res);
      return sendResponse(res, STATUS_CODE.UNAUTHORIZED, false, 'User not found');
    }

    if (payload.role !== 'user') {
      return sendResponse(res, STATUS_CODE.UNAUTHORIZED, false, 'Invalid token role');
    }

    req.user = toUserAuth(user);

    next();
  } catch (error) {
    const status = error instanceof HttpError ? error.statusCode : STATUS_CODE.FORBIDDEN;
    const message = error instanceof Error ? error.message : 'Unknown error';
    logger.error(`Failed to verify token: ${message}`);
    sendResponse(res, status, false, message);
  }
}