import z from "zod";
export class AuthValidator {
    async authValidator(data) {
        const schema = z.object({
            name: z.string('Name must be string only').min(5, 'Name must be atleast 5 letters'),
            password: z.string().min(5, 'The password must be atleast 5 letters').max(15)
        });
        schema.parse(data);
    }
    async userValidator(data) {
        const schema = z.object({
            name: z.string('Name must be string only').min(5, 'Name must be atleast 5 letters'),
            password: z.string().min(5, 'The password must be atleast 5 letters').max(15),
            linkedAcc: z.string('Give proper link')
        });
        schema.parse(data);
    }
}
//# sourceMappingURL=user.auth.validator.js.map