import express from 'express';

const app = express();
const port = 3001;

app.get('/', (req, res) => {
    res.send('¡API Express corriendo en el puerto 3001! 🚀');
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});