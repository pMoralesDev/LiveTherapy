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
    })
    .post(async (req: Request, res: Response) => {
        let controller = new UserController();
        let user = req.body;
        try {
            let result = await controller.createUser(user);
            return res.status(201).send(result);
        } catch (error) {
            LogError(`Error al crear usuario: ${error}`);
            return res.status(500).send({ message: 'Error creando usuario' });
        }
    })
    .put(async (req: Request, res: Response) => {
        let controller = new UserController();
        let id = req.query.id as string;
        let user = req.body;
        try {
          let result = await controller.updateUser(id, user);
          if (result) {
            return res.status(200).send(result);
          } else {
            return res.status(404).send({ message: 'Usuario no encontrado' });
          }
        } catch (error) {
          LogError(`Error updating user: ${error}`);
          return res.status(500).send({ message: 'Error updating user' });
        }
      })
      .delete(async (req: Request, res: Response) => {
        let controller = new UserController();
        let id = req.query.id as string;
        LogInfo(`Recivida peticion para eliminar al usuario con id: ${id}`);
        try {
          let result = await controller.deleteUser(id);
          if (result) {
            return res.status(200).send(result);
          } else {
            return res.status(404).send({ message: 'Usuario no encontrado' });
          }
        } catch (error) {
          LogError(`Error deleting user: ${error}`);
          return res.status(500).send({ message: 'Error deleting user' });
        }
      });

export default userRouter;