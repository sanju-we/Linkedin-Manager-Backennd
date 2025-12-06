import { Container } from "inversify";

// shated
import { IJWT } from "../Interface/JWT/IJWT.ts";
import { JWT } from "../../utils/JWT.setup.ts";

// admin DI
import { IAdminAuthController } from "../Interface/constroller/admin/Iadmin.auth.controller.ts";
import { AdminAuthController } from "../../controller/admin/admin.auth.controller.ts";
import { IAdminRepository } from "../Interface/Respository/IAdminRepository.ts";
import { AdminRepository } from "../../repositories/Admin.repository.ts";
import { IAdminUserController } from "../Interface/constroller/admin/Iadmin.user.controller.ts";
import { AdminUserController } from "../../controller/admin/admin.user.controller.ts";
import { IAdminAuthService } from "../Interface/service/admin/admin.auth.service.ts";
import { AdminAuthService } from "../../services/admin/admin.auth.service.ts";
import { IAdminUserService } from "../Interface/service/admin/Iadmin.user.service.ts";
import { AdminUserService } from "../../services/admin/admin.user.service.ts";
import { IAdminManageController } from "../Interface/constroller/admin/Iadmin.adminM.controller.ts";
import { AdminManageController } from "../../controller/admin/admin.manage.controller.ts";
import { IAdminManageService } from "../Interface/service/admin/Iadmin.manage.service.ts";
import { AdminManageService } from "../../services/admin/admin.manage.service.ts";

// user DI
import { IUserAuthController } from "../Interface/constroller/user/Iuser.auth.controller.ts";
import { userAuthController } from "../../controller/user/user.auth.controller.ts";
import { IUserRepository } from "../Interface/Respository/IUserRepositroty.ts";
import { UserRepository } from "../../repositories/User.repository.ts";
import { IUserAUthService } from "../Interface/service/user/IUser.auth.service.ts";
import { userAuthService } from "../../services/user/user.auth.service.ts";

// Validator DI
import { IAuthValidator } from "../Interface/validator/user/IUser.auth.validator.ts";
import { AuthValidator } from "../../validator/user.auth.validator.ts";

const container = new Container()

// admin
container.bind<IAdminAuthController>('IAdminAuthController').to(AdminAuthController);
container.bind<IAdminRepository>('IAdminRepository').to(AdminRepository);
container.bind<IAdminUserController>('IAdminUserController').to(AdminUserController);
container.bind<IAdminAuthService>('IAdminAuthService').to(AdminAuthService);
container.bind<IAdminUserService>('IAdminUserService').to(AdminUserService);
container.bind<IAdminManageController>('IAdminManageController').to(AdminManageController);
container.bind<IAdminManageService>('IAdminManageService').to(AdminManageService);

// user
container.bind<IUserAuthController>('IUserAuthController').to(userAuthController);
container.bind<IUserRepository>('IUserRepository').to(UserRepository);
container.bind<IUserAUthService>('IUserAUthService').to(userAuthService);

// shared
container.bind<IAuthValidator>('IAuthValidator').to(AuthValidator);
container.bind<IJWT>('IJWT').to(JWT)

export { container }