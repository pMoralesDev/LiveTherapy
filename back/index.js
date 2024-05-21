const expres = require('express')
const dotenv = require('dotenv')

// Configuracion del .env
dotenv.config();

// Creacion de la aplicacion de express
const app = expres()
const port = process.env.PORT || 8000

// Definimos la ruta principal de la API
app.get('/', (req, res) => {
    res.send('Welcome to Live Therapy API')
})

// Ejecutamos la aplicacion y la ponemos a la espera de peticiones en el puerto
app.listen(port, () => {
    console.log(`Live Therapy SERVER: Ejecuandose en http://localhost:${port}`)
})