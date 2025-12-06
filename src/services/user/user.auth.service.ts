import { IUserAUthService } from "../../core/Interface/service/user/IUser.auth.service.ts";
import { inject,injectable } from "inversify";
import { IUserRepository } from "../../core/Interface/Respository/IUserRepositroty.ts";
import { IUserValidator } from "../../core/Interface/validator/user/IUser.auth.validator.ts";
import { InvalidEmail } from "../../utils/errorMessages.ts";

@injectable()
export class userAuthService implements IUserAUthService{
  constructor(
    @inject('IUserValidator') private readonly _userValidator : IUserValidator,
    @inject('IUserRepository') private readonly _userRepo : IUserRepository
  ){}

  async verify(data: { email: string; password: string; }): Promise<void> {
      await this._userValidator.authValidator(data)
      const user = await this._userRepo.findByEmail(data.email)
      if(!user) throw new InvalidEmail()
      
  }
}