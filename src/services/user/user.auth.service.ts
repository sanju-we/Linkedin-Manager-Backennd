import { IUserAUthService } from "../../core/Interface/service/user/IUser.auth.service.ts";
import { inject, injectable } from "inversify";
import { IUserRepository } from "../../core/Interface/Respository/IUserRepositroty.ts";
import { IAuthValidator } from "../../core/Interface/validator/user/IUser.auth.validator.ts";
import { INVALID_CREDENTIAL, InvalidEmail } from "../../utils/errorMessages.ts";
import bcrypt from 'bcrypt'
import { IJWT } from "../../core/Interface/JWT/IJWT.ts";

@injectable()
export class userAuthService implements IUserAUthService {
  constructor(
    @inject('IAuthValidator') private readonly _userValidator: IAuthValidator,
    @inject('IUserRepository') private readonly _userRepo: IUserRepository,
    @inject('IJWT') private readonly _ijwt: IJWT
  ) { }

  async verify(data: { name: string; password: string; }): Promise<{ accessToken: string, refreshToken: string }> {
    await this._userValidator.authValidator(data)
    const user = await this._userRepo.findOne({ name: data.name })
    if (!user) throw new InvalidEmail()
    const isMatch = await bcrypt.compare(data.password, user.password)
    if (!isMatch) throw new INVALID_CREDENTIAL()
    const result = await this._ijwt.generateToken({ id: user._id.toString(), role: user.role })
    return result
  }
}