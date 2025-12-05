import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from '../config/index.js';
import * as userRepo from '../repositories/userRepository.js';

export const register = async ({ email, password }) => {
    const existing = await userRepo.findByEmail(email);
    if (existing) throw new Error('User already exists');
    const hashed = await bcrypt.hash(password, 10);
    const user = await userRepo.createUser({ email, password: hashed });
    return generateToken(user);
};

export const login = async ({ email, password }) => {
    const user = await userRepo.findByEmail(email);
    if (!user) throw new Error('Invalid credentials');
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('Invalid credentials');
    return generateToken(user);
};

const generateToken = (user) => {
    const payload = { id: user.email, email: user.email };
    return jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
};
