export const toUserAuth = (user) => ({
    id: user._id.toString(),
    name: user.name,
    role: user.role
});
//# sourceMappingURL=Request.DTO.js.map