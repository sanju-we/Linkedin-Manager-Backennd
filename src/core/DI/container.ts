import { Container } from "inversify";

// shated
import { IJWT } from "../Interface/JWT/IJWT";
import { JWT } from "../../utils/JWT.setup";

// admin DI
import { IAdminAuthController } from "../Interface/controller/admin/Iadmin.auth.controller";
import { AdminAuthController } from "../../controller/admin/admin.auth.controller";
import { IAdminRepository } from "../Interface/Respository/IAdminRepository";
import { AdminRepository } from "../../repositories/Admin.repository";
import { IAdminUserController } from "../Interface/controller/admin/Iadmin.user.controller";
import { AdminUserController } from "../../controller/admin/admin.user.controller";
import { IAdminAuthService } from "../Interface/service/admin/admin.auth.service";
import { AdminAuthService } from "../../services/admin/admin.auth.service";
import { IAdminUserService } from "../Interface/service/admin/Iadmin.user.service";
import { AdminUserService } from "../../services/admin/admin.user.service";
import { IAdminManageController } from "../Interface/controller/admin/Iadmin.adminM.controller";
import { AdminManageController } from "../../controller/admin/admin.manage.controller";
import { IAdminManageService } from "../Interface/service/admin/Iadmin.manage.service";
import { AdminManageService } from "../../services/admin/admin.manage.service";

// user DI
import { IUserAuthController } from "../Interface/controller/user/Iuser.auth.controller";
import { userAuthController } from "../../controller/user/user.auth.controller";
import { IUserRepository } from "../Interface/Respository/IUserRepositroty";
import { UserRepository } from "../../repositories/User.repository";
import { IUserAUthService } from "../Interface/service/user/IUser.auth.service";
import { userAuthService } from "../../services/user/user.auth.service";
import { IUserProfileController } from "../Interface/controller/user/IUser.profile.controller";
import { UserProfileController } from "../../controller/user/user.profile.controller";
import { IuserProfileService } from "../Interface/service/user/IUser.profile.service";
import { userProfileService } from "../../services/user/user.profile.service";

// Validator DI
import { IAuthValidator } from "../Interface/validator/user/IUser.auth.validator";
import { AuthValidator } from "../../validator/user.auth.validator";

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
container.bind<IUserProfileController>('IUserProfileController').to(UserProfileController);
container.bind<IuserProfileService>('IuserProfileService').to(userProfileService);

// shared
container.bind<IAuthValidator>('IAuthValidator').to(AuthValidator);
container.bind<IJWT>('IJWT').to(JWT)

export { container }