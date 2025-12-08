import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/errorMessages";
import { sendResponse } from "../utils/sendResponse";
import { STATUS_CODE } from "../utils/StatusCodes";
import { User } from "../models/User";
import { JWT } from "../utils/JWT.setup";
import { logger } from "../utils/logger";
import jwt from "jsonwebtoken";
import { toUserAuth } from "../core/DTO/user/Request.DTO";
import { Admin } from "../models/Admin";

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

export async function verifyAdminToken(req: Request, res: Response, next: NextFunction) {
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

    const user = await Admin.findById(payload.id);
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