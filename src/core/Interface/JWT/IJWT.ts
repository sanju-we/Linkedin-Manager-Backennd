import { Response } from 'express';
import { ResetToken } from '../../../types/index.ts'

export interface IJWT {
  setTokenInCookies(res: Response, accessToken: string, refreshToken: string): Promise<void>;
  generateToken(payload: { id: string; role: string }): Promise<{
    accessToken: string;
    refreshToken: string;
  }>;
  blacklistRefreshToken(res: Response): Promise<{ res: Response }>;
  verifyRefreshToken(refreshToken: string): Promise<{ id: string; role: string }>;
  verify(accessToken: string): Promise<{ id: string; email: string }>;
}
