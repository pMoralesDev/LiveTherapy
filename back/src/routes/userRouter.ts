import express, { NextFunction, Request, Response } from "express"; 
import { UserController } from "../controller/userController";
import { LogInfo, LogError } from '../utils/logger';
import { verifyToken } from "@/middlewares/authMiddlewares";
import { requireRole, verifyAccess } from "@/middlewares/rolMiddleware";
import { ITokenPayload } from "@/domain/interfaces/ITokenPayload.interface";

const userRouter = express.Router();
const controller = new UserController();

// Ruta para obtener todos los usuarios (solo accesible por administradores)
userRouter.get('/', verifyToken, requireRole(['admin']), async (req: Request, res: Response) => {
    try {
        const result = await controller.getUsers();
        LogInfo('Todos los usuarios obtenidos');
        return res.status(200).json(result);
    } catch (error) {
        LogError(`Error al obtener usuarios: ${error}`);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Ruta para obtener datos de un usuario por ID (accesible por el propio usuario, terapeutas o administradores)
userRouter.get('/:id', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
    if ((req.user as ITokenPayload).role === 'admin' || (req.user as ITokenPayload).role === 'terapeuta' ||(req.user as ITokenPayload).id === req.params.id) {
        next();
    } else {
        return res.status(403).send({ message: 'Access denied' });
    }
}, async (req: Request, res: Response) => {
    try {
        const result = await controller.getUserByID(req.params.id);
        if (result) {
            LogInfo(`Usuario con id: ${req.params.id} encontrado`);
            return res.status(200).json(result);
        } else {
            LogInfo(`Usuario con id: ${req.params.id} no encontrado`);
            return res.status(404).json({ message: `Usuario con id: ${req.params.id} no encontrado` });
        }
    } catch (error) {
        LogError(`Error al obtener usuario: ${error}`);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Ruta para crear un usuario (solo accesible por administradores)
userRouter.post('/', verifyToken, requireRole(['admin']), async (req: Request, res: Response) => {
    const user = req.body;
    LogInfo(`${JSON.stringify(user)}`)
    try {
        const result = await controller.createUser(user);
        return res.status(201).send(result);
    } catch (error) {
        LogError(`Error al crear usuario: ${error}`);
        return res.status(500).send({ message: 'Error creando usuario' });
    }
});

// Ruta para actualizar un usuario (accesible por el propio usuario o administradores)
userRouter.put('/', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
    if ((req.user as ITokenPayload).role === 'admin' || (req.user as ITokenPayload).id === req.query.id) {
        next();
    } else {
        return res.status(403).send({ message: 'Access denied' });
    }
}, async (req: Request, res: Response) => {
    const id = req.query.id as string;
    const user = req.body;

    try {
        const result = await controller.updateUser(id, user);
        if (result) {
            return res.status(200).send(result);
        } else {
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        LogError(`Error actualizando usuario: ${error}`);
        return res.status(500).send({ message: 'Error actualizando usuario' });
    }
});

// Ruta para eliminar un usuario (solo accesible por administradores)
userRouter.delete('/', verifyToken, requireRole(['admin']), async (req: Request, res: Response) => {
    const id = req.query.id as string;

    LogInfo(`Recibida petición para eliminar al usuario con id: ${id}`);

    try {
        const result = await controller.deleteUser(id);
        if (result) {
            return res.status(200).send(result);
        } else {
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        LogError(`Error eliminando usuario: ${error}`);
        return res.status(500).send({ message: 'Error eliminando usuario' });
    }
});

export default userRouter;