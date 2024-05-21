/**
 * 
 */

import express, { Request, Express, Response } from "express";
import dotenv from "dotenv";
// Seguridad
import cors from 'cors';
import helmet from 'helmet';

//TODO Https

import rootRouter from '../routes'

dotenv.config();

const app:Express = express();
const port: string | number = process.env.PORT || 8000;

// Endpoint para la ruta http://localhost:8000/api
app.use( '/api', rootRouter );

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