import { Userauth, AdminAuth } from '../index';

declare global {
  namespace Express {
    interface Request {
      user: Userauth | AdminAuth;
    }
  }
}
