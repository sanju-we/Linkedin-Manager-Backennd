import { BaseRepository } from "./Base.repository.ts";
import { IAdmin } from "../core/Interface/Model/Iadmin.model.ts";
import { Admin } from "../models/Admin.ts";
import { IAdminRepository } from "../core/Interface/Respository/IAdminRepository.ts";

export class AdminRepository extends BaseRepository<IAdmin> implements IAdminRepository {
  constructor() {
    super(Admin)
  }
}