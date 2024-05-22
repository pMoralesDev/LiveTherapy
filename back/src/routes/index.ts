/**
 * @exports routes
 * Enrutador principal de la aplicacion, desde esta clase se derivan todas las peticiones a su correspondiente ruta
 * para que puedan ser atendidas debidamente.
 */
import express, { Request, Response } from "express"; 
import {LogInfo} from '../utils/logger';
// Routers
import userRouter from "./userRouter";

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
// //Auth router
// server.use('/auth', authRouter); //http://localhost:8000/api/auth --> AuthRouter
// //kata router
// server.use('/katas', katasRouter); //http://localhost:8000/api/katas --> KatasRouter

export default server;