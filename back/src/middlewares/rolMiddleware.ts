import { Request, Response, NextFunction } from 'express';

import { LogError, LogInfo } from '../utils/logger';
import UserModel from '@/domain/entities/user.entity';
import TerapiaModel from '@/domain/entities/terapia.entity';
import CuestionarioModel from '@/domain/entities/cuestionario.entity';
import { ITokenPayload } from '@/domain/interfaces/ITokenPayload.interface';

export const requireRole = (roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).send({ message: 'Access denied. No user data.' });
        }

        const user = await UserModel.findById((req.user as ITokenPayload).id);
        if (!user || !roles.includes(user.role)) {
            return res.status(403).send({ message: 'Access denied.' });
        }
        next();
    };
};

export const verifyAccess = (accessType: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {

        if (!req.user) {
            return res.status(401).send({ message: 'Access denied. No user data.' });
        }

        const userId = (req.user as ITokenPayload).id;
        const userRole = (req.user as ITokenPayload).role;
        const resourceId = req.params.id;

        try {
            if (userRole === 'admin') {
                // Admins have access to all data
                next();
            } else if (userRole === 'therapist') {
                if (accessType === 'therapy') {
                    const therapy = await TerapiaModel.findOne({ therapistId: userId, _id: resourceId });
                    if (!therapy) {
                        return res.status(403).send({ message: 'Access denied. Not your patient.' });
                    }
                } else if (accessType === 'cuestionario') {
                    const cuestionario = await CuestionarioModel.findOne({ createdBy: userId, _id: resourceId });
                    if (!cuestionario) {
                        return res.status(403).send({ message: 'Access denied. Not your cuestionario.' });
                    }
                }
                next();
            } else if (userRole === 'patient') {
                if (accessType === 'user' && userId !== resourceId) {
                    return res.status(403).send({ message: 'Access denied. Can only access own data.' });
                }
                next();
            } else {
                return res.status(403).send({ message: 'Access denied.' });
            }
        } catch (error) {
            LogError(`Error verifying access: ${error}`);
            return res.status(500).send({ message: 'Server error' });
        }
    };
};
