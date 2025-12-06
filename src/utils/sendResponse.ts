import { Response } from "express";

export function sendResponse<T = unknown>(
  res: Response,
  status: number,
  success: boolean,
  message: string,
  data?: T,
) {
  res.status(status).json({ success, message, data });
}
