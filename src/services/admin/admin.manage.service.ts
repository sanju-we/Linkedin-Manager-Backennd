import { IAdminManageService } from "../../core/Interface/service/admin/Iadmin.manage.service";
import { IAuthValidator } from "../../core/Interface/validator/user/IUser.auth.validator";
import { inject, injectable } from "inversify";
import { IAdminRepository } from "../../core/Interface/Respository/IAdminRepository";
import { ALREADY_EXISTS } from "../../utils/errorMessages";
import bcrypt from 'bcrypt'
import { IAdmin } from "../../core/Interface/Model/Iadmin.model";

@injectable()
export class AdminManageService implements IAdminManageService{
  constructor(
    @inject('IAuthValidator') private readonly _authValidator : IAuthValidator,
    @inject('IAdminRepository') private readonly _adminRepo : IAdminRepository
  ){}
  async addAdmin(name: string, password: string): Promise<IAdmin> {
      await this._authValidator.authValidator({name,password})
      const existing = await this._adminRepo.findOne({name:name})
      if(existing) throw new ALREADY_EXISTS()
        const hashedPassword = await bcrypt.hash(password,10)
      const admin = await this._adminRepo.create({name,password:hashedPassword})
      return admin 
  }
}