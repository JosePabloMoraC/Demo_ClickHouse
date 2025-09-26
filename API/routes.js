import express from 'express';
import { getComida, deleteComida, addComida, updateComida, getComidaResumen } from './controller_model.js';

const router = express.Router();

router.get('/', getComida);
router.get('/resumen', getComidaResumen);
// Borrar un tipo de comida por ID
router.delete('/:id', deleteComida);
// Agregar un nuevo tipo de comida
router.post('/', addComida);
// Actualizar un tipo de comida por ID
router.patch('/:id', updateComida);

export default router;
