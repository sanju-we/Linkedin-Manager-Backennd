"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidator = void 0;
const zod_1 = __importDefault(require("zod"));
class AuthValidator {
    async authValidator(data) {
        const schema = zod_1.default.object({
            name: zod_1.default.string('Name must be string only').min(5, 'Name must be atleast 5 letters'),
            password: zod_1.default.string().min(5, 'The password must be atleast 5 letters').max(15)
        });
        schema.parse(data);
    }
    async userValidator(data) {
        const schema = zod_1.default.object({
            name: zod_1.default.string('Name must be string only').min(5, 'Name must be atleast 5 letters'),
            password: zod_1.default.string().min(5, 'The password must be atleast 5 letters').max(15),
            linkedAcc: zod_1.default.string('Give proper link')
        });
        schema.parse(data);
    }
}
exports.AuthValidator = AuthValidator;
//# sourceMappingURL=user.auth.validator.js.map