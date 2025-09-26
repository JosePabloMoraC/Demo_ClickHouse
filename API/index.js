import express from 'express';
import routes from './routes.js';

const app = express();
const port = 3001;

// Middleware para parsear JSON
app.use(express.json());

// Rutas para tipo de comida
app.use('/comidas', routes);

// Ruta raíz para verificar que el servidor está funcionando
app.get('/', (req, res) => {
    res.send('¡API corriendo en el puerto 3001!');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});