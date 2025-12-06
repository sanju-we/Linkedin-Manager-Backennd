import { IAdminAuthService } from "../../core/Interface/service/admin/admin.auth.service.ts";
import { IAuthValidator } from "../../core/Interface/validator/user/IUser.auth.validator.ts";
import { inject, injectable } from "inversify";
import { IUserRepository } from "../../core/Interface/Respository/IUserRepositroty.ts";
import { IAdminRepository } from "../../core/Interface/Respository/IAdminRepository.ts";
import { ALREADY_EXISTS, INVALID_CREDENTIAL, InvalidEmail } from "../../utils/errorMessages.ts";
import bcrypt from 'bcrypt'
import { IJWT } from "../../core/Interface/JWT/IJWT.ts";

@injectable()
export class AdminAuthService implements IAdminAuthService {
  constructor(
    @inject('IAuthValidator') private readonly _authValidator: IAuthValidator,
    @inject('IUserRepository') private readonly _userRepo: IUserRepository,
    @inject('IAdminRepository') private readonly _adminRepo: IAdminRepository,
    @inject('IJWT') private readonly _ijwt: IJWT
  ) { }
  async verifyLogin(data: { email: string; password: string; }): Promise<{ accessToken: string, refreshToken: string }> {
    await this._authValidator.authValidator(data)
    const existing = await this._adminRepo.findByEmail(data.email)
    if (!existing) throw new InvalidEmail()
    const isMatch = await bcrypt.compare(existing.password, data.password)
    if (!isMatch) throw new INVALID_CREDENTIAL()
    const result = await this._ijwt.generateToken({ id: existing._id.toString(), role: existing.role })
    return result
  }
}