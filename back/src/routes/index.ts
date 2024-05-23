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
import messageRouter from "./messageRouter";
import terapiaRouter from "./terapiaRouter";
import answerRouter from "./answerRouter";
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
server.use('/citas', verifyToken, citaRouter); //http://localhost:8000/api/citas --> CitaRouter
server.use('/questions', verifyToken, questionRouter); //http://localhost:8000/api/questions --> QuestionRouter
server.use('/cuestionarios', verifyToken, cuestionarioRouter); //http://localhost:8000/api/cuestionarios --> QuestionRouter
server.use('/messages', verifyToken, messageRouter); //http://localhost:8000/api/messages --> QuestionRouter
server.use('/answers', verifyToken, answerRouter); //http://localhost:8000/api/answers --> AnswerRouter
server.use('/terapias', verifyToken, terapiaRouter); //http://localhost:8000/api/terapias --> TerapiaRouter


export default server;