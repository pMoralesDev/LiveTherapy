import express, { Request, Response } from "express"; 
import { UserController } from "../controller/userController";
import { LogInfo, LogError } from '../utils/logger';

const userRouter = express.Router();

// http://localhost:8000/api/users
userRouter.route('/')
    .get(async (req: Request, res: Response) => {
        const controller = new UserController();
        const id: string | undefined = req.query.id as string;

        try {
            if (id) {
                const result = await controller.getUsers(id);
                if (result) {
                    LogInfo(`Usuario con id: ${id} encontrado`);
                    return res.status(200).json(result);
                } else {
                    LogInfo(`Usuario con id: ${id} no encontrado`);
                    return res.status(404).json({ message: `Usuario con id: ${id} no encontrado` });
                }
            } else {
                const result = await controller.getUsers();
                LogInfo(`Todos los usuarios obtenidos`);
                return res.status(200).json(result);
            }
        } catch (error) {
            LogError(`Error al obtener usuario(s): ${error}`);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    });

export default userRouter;