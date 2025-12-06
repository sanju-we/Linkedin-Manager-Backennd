import z from "zod";
import { IAuthValidator } from "../core/Interface/validator/user/IUser.auth.validator.ts";

export class AuthValidator implements IAuthValidator{
  async authValidator(data: { email: string; password: string; }): Promise<void> {
      const schema = z.object({
        email:z.email('Invalid email'),
        password:z.string().min(5,'The password must be atleast 5 letters').max(15)
      })
      schema.parse(data)
  }
}