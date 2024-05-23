import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';
import { IUser } from '../domain/interfaces/IUser.interface';
import UserModel from '../domain/entities/user.entity';
import express from 'express';

dotenv.config();
const secretKey = process.env.SECRETKEY || 'thIs$mi@Jwt>secret';

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey,
};

passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            const user: IUser | null = await UserModel.findById(jwt_payload.id);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (error) {
            return done(error, false);
        }
    })
);

// Middleware para manejar errores de autenticación
export const authErrorHandler = (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send({ message: 'Invalid token' });
    } else {
        next(err);
    }
};

export default passport;