import express, { Request, Response } from "express"; 
import { userController } from "../controller/userController";
import {LogInfo} from '../utils/logger';

let userRouter = express.Router();

// http://localhost:8000/api/users
userRouter.route('/')
    .get(async (req:Request, res: Response) => {
        let controller = new userController();
        let id: string | undefined = req.query.id as string;

        if(id){
            try {
                let result = await controller.getUsers(id);
                return res.status(200).send(result);
            } catch (error) {
                LogInfo(`Usuario con id: ${id} no encontrado`);
                return res.status(500).send({ message: 'Usuario no encontrado'});
            }
        } else{
            return res.status(200).send(await controller.getUsers());
        }
        
    })

export default userRouter;