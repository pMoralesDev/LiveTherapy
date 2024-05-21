import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app:Express = express();
const port: string | number = process.env.PORT || 8000;

// Definimos la ruta principal de la API
app.get('/', (req:Request, res:Response) => {
    res.send('Welcome to Live Therapy API')
})

// Ejecutamos la aplicacion y la ponemos a la espera de peticiones en el puerto
app.listen(port, () => {
    console.log(`Live Therapy SERVER: Ejecuandose en http://localhost:${port}`)
})