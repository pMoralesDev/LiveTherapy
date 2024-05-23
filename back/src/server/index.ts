/**
 * 
 */

import express, { Request, Express, Response } from "express";
import dotenv from "dotenv";
// Seguridad
import cors from 'cors';
import helmet from 'helmet';
// Swagger
import swaggerUi from 'swagger-ui-express'

//TODO Https

import rootRouter from '../routes'
import connectDB from "./mongo.db";
import bodyParser from "body-parser";
import passport, { authErrorHandler } from "@/config/passport.config";
import authRouter from "@/routes/authRouter";

dotenv.config();

const app:Express = express();
const port: string | number = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(passport.initialize());

// Endpotin para swagger
app.use(
    '/api/docs', swaggerUi.serve, swaggerUi.setup( undefined, {
        swaggerOptions: {url: "/swagger.json", explorer: true}
    })
)

// Ruta de autenticación http://localhost:8000/api/auth
app.use('/api/auth', authRouter);

// Endpoint protegido para la ruta http://localhost:8000/api
app.use('/api', passport.authenticate('jwt', { session: false }), rootRouter);

// Manejo de errores de autenticación
app.use(authErrorHandler);

// Servidor estatico
app.use(express.static('public'));

//Mongoose conection
connectDB();

// Configuracion de seguridad
app.use(helmet());
app.use(cors());

app.use(express.urlencoded({extended:true, limit: '50mb'}));
app.use(express.json({limit:'50mb'}));

//Redireccion por defecto http://localhost:8000/ --> http://localhost:8000/api/
app.get('/', (req: Request, res:Response) => {
    res.redirect('/api');
})

export default app;