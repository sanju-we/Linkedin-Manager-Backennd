"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRepository = void 0;
const Base_repository_1 = require("./Base.repository");
const Admin_1 = require("../models/Admin");
class AdminRepository extends Base_repository_1.BaseRepository {
    constructor() {
        super(Admin_1.Admin);
    }
}
exports.AdminRepository = AdminRepository;
