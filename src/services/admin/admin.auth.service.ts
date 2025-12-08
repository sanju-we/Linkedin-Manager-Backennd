import { IAdminAuthService } from "../../core/Interface/service/admin/admin.auth.service";
import { IAuthValidator } from "../../core/Interface/validator/user/IUser.auth.validator";
import { inject, injectable } from "inversify";
import { IUserRepository } from "../../core/Interface/Respository/IUserRepositroty";
import { IAdminRepository } from "../../core/Interface/Respository/IAdminRepository";
import { ALREADY_EXISTS, INVALID_CREDENTIAL, InvalidEmail } from "../../utils/errorMessages";
import bcrypt from 'bcrypt'
import { IJWT } from "../../core/Interface/JWT/IJWT";

@injectable()
export class AdminAuthService implements IAdminAuthService {
  constructor(
    @inject('IAuthValidator') private readonly _authValidator: IAuthValidator,
    @inject('IUserRepository') private readonly _userRepo: IUserRepository,
    @inject('IAdminRepository') private readonly _adminRepo: IAdminRepository,
    @inject('IJWT') private readonly _ijwt: IJWT
  ) { }
  async verifyLogin(data: { name: string; password: string; }): Promise<{ accessToken: string, refreshToken: string }> {
    await this._authValidator.authValidator(data)
    const existing = await this._adminRepo.findOne({name:data.name})
    if (!existing) throw new InvalidEmail()
    const isMatch = await bcrypt.compare(data.password,existing.password)
    if (!isMatch) throw new INVALID_CREDENTIAL()
    const result = await this._ijwt.generateToken({ id: existing._id.toString(), role: existing.role })
    return result
  }
}