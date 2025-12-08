import { BaseRepository } from "./Base.repository";
import { IAdmin } from "../core/Interface/Model/Iadmin.model";
import { Admin } from "../models/Admin";
import { IAdminRepository } from "../core/Interface/Respository/IAdminRepository";

export class AdminRepository extends BaseRepository<IAdmin> implements IAdminRepository {
  constructor() {
    super(Admin)
  }
}