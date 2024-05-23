/**
 * @exports routes
 * Enrutador principal de la aplicacion, desde esta clase se derivan todas las peticiones a su correspondiente ruta
 * para que puedan ser atendidas debidamente.
 */
import express, { Request, Response } from "express"; 
import {LogInfo} from '../utils/logger';
// Routers
import userRouter from "./userRouter";
import citaRouter from "./citaRouter";
import questionRouter from "./questionRouter";
import cuestionarioRouter from "./cuestionariosRouter";

let server = express();

let rootRouter = express.Router();

//Genera la respuesta para home http://localhost:8000/api
rootRouter.get('/', (req: Request, res: Response) => {

    LogInfo('GET: http://localhost:8000/api')
    res.send('Welcome to Live Therapy API');

});

//Redirecciones de las diferentes peticiones hacia su corespondiente ruta
server.use('/', rootRouter); //http://localhost:8000/api
server.use('/users', userRouter); //http://localhost:8000/api/users --> UserRouter
server.use('/citas', citaRouter); //http://localhost:8000/api/citas --> CitaRouter
server.use('/questions', questionRouter); //http://localhost:8000/api/questions --> QuestionRouter
server.use('/cuestionarios', cuestionarioRouter); //http://localhost:8000/api/cuestionarios --> QuestionRouter


export default server;