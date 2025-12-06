import { Container } from "inversify";

// admin DI
import { IAdminAuthController } from "../Interface/constroller/admin/Iadmin.auth.controller.ts";
import { AdminAuthController } from "../../controller/admin/admin.auth.controller.ts";
import { IAdminRepository } from "../Interface/Respository/IAdminRepository.ts";
import { AdminRepository } from "../../repositories/Admin.repository.ts";

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

// user
container.bind<IUserAuthController>('IUserAuthController').to(userAuthController);
container.bind<IUserRepository>('IUserRepository').to(UserRepository);
container.bind<IUserAUthService>('IUserAUthService').to(userAuthService);

// shared
container.bind<IAuthValidator>('IAuthValidator').to(AuthValidator)

export { container }