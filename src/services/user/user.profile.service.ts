import { IuserProfileService } from "../../core/Interface/service/user/IUser.profile.service.ts";
import { IUserRepository } from "../../core/Interface/Respository/IUserRepositroty.ts";
import { inject, injectable } from "inversify";
import { USER_NOT_FOUND } from "../../utils/errorMessages.ts";
import { IUser } from "../../core/Interface/Model/Iuser.model.ts";

@injectable()
export class userProfileService implements IuserProfileService {
  constructor(
    @inject('IUserRepository') private readonly _userRepo: IUserRepository
  ) { }
  async getProfile(id: string): Promise<IUser> {
    const user = await this._userRepo.findById(id);
    if (!user) throw new USER_NOT_FOUND()
    return user
  }
}