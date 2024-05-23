import { IUser } from '@/domain/interfaces/IUser.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secretKey = process.env.SECRETKEY || 'thIs$mi@Jwt>secret';

// Hash de la contraseña
export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

// Comparar contraseñas
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword);
};

// Generar JWT
export const generateToken = (user: IUser): string => {
    const payload = {
        id: user._id,
        email: user.email,
        role: user.rol
    };

    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

// Verificar JWT
export const verifyToken = (token: string): any => {
    return jwt.verify(token, secretKey);
};
