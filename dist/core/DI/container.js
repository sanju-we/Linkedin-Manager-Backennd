import { Container } from "inversify";
import { JWT } from "../../utils/JWT.setup";
import { AdminAuthController } from "../../controller/admin/admin.auth.controller";
import { AdminRepository } from "../../repositories/Admin.repository";
import { AdminUserController } from "../../controller/admin/admin.user.controller";
import { AdminAuthService } from "../../services/admin/admin.auth.service";
import { AdminUserService } from "../../services/admin/admin.user.service";
import { AdminManageController } from "../../controller/admin/admin.manage.controller";
import { AdminManageService } from "../../services/admin/admin.manage.service";
import { userAuthController } from "../../controller/user/user.auth.controller";
import { UserRepository } from "../../repositories/User.repository";
import { userAuthService } from "../../services/user/user.auth.service";
import { UserProfileController } from "../../controller/user/user.profile.controller";
import { userProfileService } from "../../services/user/user.profile.service";
import { AuthValidator } from "../../validator/user.auth.validator";
const container = new Container();
// admin
container.bind('IAdminAuthController').to(AdminAuthController);
container.bind('IAdminRepository').to(AdminRepository);
container.bind('IAdminUserController').to(AdminUserController);
container.bind('IAdminAuthService').to(AdminAuthService);
container.bind('IAdminUserService').to(AdminUserService);
container.bind('IAdminManageController').to(AdminManageController);
container.bind('IAdminManageService').to(AdminManageService);
// user
container.bind('IUserAuthController').to(userAuthController);
container.bind('IUserRepository').to(UserRepository);
container.bind('IUserAUthService').to(userAuthService);
container.bind('IUserProfileController').to(UserProfileController);
container.bind('IuserProfileService').to(userProfileService);
// shared
container.bind('IAuthValidator').to(AuthValidator);
container.bind('IJWT').to(JWT);
export { container };
//# sourceMappingURL=container.js.map