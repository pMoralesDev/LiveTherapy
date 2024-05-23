/**
 * @exports routes
 * Enrutador principal de la aplicacion, desde esta clase se derivan todas las peticiones a su correspondiente ruta
 * para que puedan ser atendidas debidamente.
 */
import express, { Request, Response } from "express"; 
import {LogInfo} from '../utils/logger';
// Routers
import userRouter from "./userRouter";
import cuestionarioRouter from "./cuestionariosRouter";
import terapiaRouter from "./terapiaRouter";
import { verifyToken } from "@/middlewares/authMiddlewares";

let server = express();

let rootRouter = express.Router();

//Genera la respuesta para home http://localhost:8000/api
rootRouter.get('/', (req: Request, res: Response) => {

    LogInfo('GET: http://localhost:8000/api')
    res.send('Welcome to Live Therapy API');

});

//Redirecciones de las diferentes peticiones hacia su corespondiente ruta
server.use('/', rootRouter); //http://localhost:8000/api
server.use('/users', verifyToken, userRouter); //http://localhost:8000/api/users --> UserRouter
server.use('/cuestionarios', verifyToken, cuestionarioRouter); //http://localhost:8000/api/cuestionarios --> QuestionRouter
server.use('/terapias', verifyToken, terapiaRouter); //http://localhost:8000/api/terapias --> TerapiaRouter


export default server;