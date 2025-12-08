"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const Base_repository_1 = require("./Base.repository");
const User_1 = require("../models/User");
class UserRepository extends Base_repository_1.BaseRepository {
    constructor() {
        super(User_1.User);
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=User.repository.js.map