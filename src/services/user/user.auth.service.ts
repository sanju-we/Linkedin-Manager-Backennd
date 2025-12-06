import { IUserAUthService } from "../../core/Interface/service/user/IUser.auth.service.ts";
import { inject,injectable } from "inversify";
import { IUserRepository } from "../../core/Interface/Respository/IUserRepositroty.ts";
import { IAuthValidator } from "../../core/Interface/validator/user/IUser.auth.validator.ts";
import { InvalidEmail } from "../../utils/errorMessages.ts";

@injectable()
export class userAuthService implements IUserAUthService{
  constructor(
    @inject('IAuthValidator') private readonly _userValidator : IAuthValidator,
    @inject('IUserRepository') private readonly _userRepo : IUserRepository
  ){}

  async verify(data: { name: string; password: string; }): Promise<void> {
      await this._userValidator.authValidator(data)
      const user = await this._userRepo.findOne({name:data.name})
      if(!user) throw new InvalidEmail()
      
  }
}