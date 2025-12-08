import z from "zod";
import { IAuthValidator } from "../core/Interface/validator/user/IUser.auth.validator";

export class AuthValidator implements IAuthValidator{
  async authValidator(data: { name: string; password: string; }): Promise<void> {
      const schema = z.object({
        name:z.string('Name must be string only').min(5,'Name must be atleast 5 letters'),
        password:z.string().min(5,'The password must be atleast 5 letters').max(15)
      })
      schema.parse(data)
  }

  async userValidator(data: { name: string; password: string; linkedAcc: string; }): Promise<void> {
      const schema = z.object({
        name:z.string('Name must be string only').min(5,'Name must be atleast 5 letters'),
        password:z.string().min(5,'The password must be atleast 5 letters').max(15),
        linkedAcc: z.string('Give proper link')
      })
      schema.parse(data)
  }
}