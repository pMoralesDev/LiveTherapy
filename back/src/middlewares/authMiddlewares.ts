import UserModel from '@/domain/entities/user.entity';
import { LogInfo, LogWarning } from '@/utils/logger';
import { LogError } from 'concurrently';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { IUser } from '@/domain/interfaces/IUser.interface';
import { ITokenPayload } from '@/domain/interfaces/ITokenPayload.interface';

dotenv.config();
const secretKey = process.env.JWT_SECRET || 'thIs$mi@Jwt>secret';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).send({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, secretKey) as ITokenPayload;
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send({ message: `'Invalid token.' ${token}` });
    }
};

