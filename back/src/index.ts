import dotenv from 'dotenv';
import app from './server';
import { LogError } from './utils/logger';

dotenv.config();

const port: string | number = process.env.PORT || 8000;

// Ejecutamos la aplicacion y la ponemos a la espera de peticiones en el puerto
app.listen(port, () => {
    console.log(`Live Therapy SERVER: Ejecuandose en http://localhost:${port}`);
});

app.on('error', (error) => {
    LogError(`[SERVER ERROR]: ${error}`);
});