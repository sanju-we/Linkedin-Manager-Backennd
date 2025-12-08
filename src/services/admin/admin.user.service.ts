import { IAdminUserService } from "../../core/Interface/service/admin/Iadmin.user.service";
import { inject, injectable } from "inversify";
import { IAuthValidator } from "../../core/Interface/validator/user/IUser.auth.validator";
import { IUserRepository } from "../../core/Interface/Respository/IUserRepositroty";
import { ALREADY_EXISTS, DATA_NOT_FOUND } from "../../utils/errorMessages";
import bcrypt from 'bcrypt'
import { IUser } from "../../core/Interface/Model/Iuser.model";

@injectable()
export class AdminUserService implements IAdminUserService {
  constructor(
    @inject('IAuthValidator') private readonly _authValidator: IAuthValidator,
    @inject('IUserRepository') private readonly _userRepo: IUserRepository
  ) { }
  async addUser(data: { name: string; password: string; linkedAcc: string; }): Promise<IUser> {
    await this._authValidator.userValidator(data)
    const existing = await this._userRepo.findOne({ name: data.name })
    if (existing) throw new ALREADY_EXISTS()
    const hashedPassword = await bcrypt.hash(data.password, 10)
    const user = await this._userRepo.create({ name: data.name, password: hashedPassword, linkedAcc: data.linkedAcc })
    return user
  }

  async getAllUsers(): Promise<IUser[]> {
    const users = await this._userRepo.findAll({})
    if (!users) throw new DATA_NOT_FOUND()
    return users
  }

  async getUser(userId: string): Promise<IUser> {
    const user = await this._userRepo.findById(userId);
    if (!user) throw new DATA_NOT_FOUND()
    return user
  }
}