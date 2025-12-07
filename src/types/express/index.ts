import { Userauth, AdminAuth } from '../index.ts';

declare global {
  namespace Express {
    interface Request {
      user: Userauth | AdminAuth;
    }
  }
}
