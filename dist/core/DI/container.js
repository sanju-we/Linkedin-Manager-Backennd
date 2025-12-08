"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const inversify_1 = require("inversify");
const JWT_setup_1 = require("../../utils/JWT.setup");
const admin_auth_controller_1 = require("../../controller/admin/admin.auth.controller");
const Admin_repository_1 = require("../../repositories/Admin.repository");
const admin_user_controller_1 = require("../../controller/admin/admin.user.controller");
const admin_auth_service_1 = require("../../services/admin/admin.auth.service");
const admin_user_service_1 = require("../../services/admin/admin.user.service");
const admin_manage_controller_1 = require("../../controller/admin/admin.manage.controller");
const admin_manage_service_1 = require("../../services/admin/admin.manage.service");
const user_auth_controller_1 = require("../../controller/user/user.auth.controller");
const User_repository_1 = require("../../repositories/User.repository");
const user_auth_service_1 = require("../../services/user/user.auth.service");
const user_profile_controller_1 = require("../../controller/user/user.profile.controller");
const user_profile_service_1 = require("../../services/user/user.profile.service");
const user_auth_validator_1 = require("../../validator/user.auth.validator");
const container = new inversify_1.Container();
exports.container = container;
// admin
container.bind('IAdminAuthController').to(admin_auth_controller_1.AdminAuthController);
container.bind('IAdminRepository').to(Admin_repository_1.AdminRepository);
container.bind('IAdminUserController').to(admin_user_controller_1.AdminUserController);
container.bind('IAdminAuthService').to(admin_auth_service_1.AdminAuthService);
container.bind('IAdminUserService').to(admin_user_service_1.AdminUserService);
container.bind('IAdminManageController').to(admin_manage_controller_1.AdminManageController);
container.bind('IAdminManageService').to(admin_manage_service_1.AdminManageService);
// user
container.bind('IUserAuthController').to(user_auth_controller_1.userAuthController);
container.bind('IUserRepository').to(User_repository_1.UserRepository);
container.bind('IUserAUthService').to(user_auth_service_1.userAuthService);
container.bind('IUserProfileController').to(user_profile_controller_1.UserProfileController);
container.bind('IuserProfileService').to(user_profile_service_1.userProfileService);
// shared
container.bind('IAuthValidator').to(user_auth_validator_1.AuthValidator);
container.bind('IJWT').to(JWT_setup_1.JWT);
