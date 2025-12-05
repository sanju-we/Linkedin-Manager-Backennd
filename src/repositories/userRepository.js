// In‑memory placeholder – replace with DB implementation later
const users = [];

export const createUser = async (user) => {
    users.push(user);
    return user;
};

export const findByEmail = async (email) => {
    return users.find((u) => u.email === email);
};
