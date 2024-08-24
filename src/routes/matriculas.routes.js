import Router from 'express';
import { listarMatriculas, detalleMatricula, registrarMatricula, eliminarMatricula, actualizarMatricula } from '../controllers/matricula.controller.js';
import verificarAutenticacion from '../middlewares/auth.js';

const router = Router();

router.post('/matricula/registro',verificarAutenticacion, registrarMatricula);
router.get('/matriculas',verificarAutenticacion, listarMatriculas);
router.get('/matricula/:id',verificarAutenticacion, detalleMatricula);
router.put('/matricula/:id',verificarAutenticacion, actualizarMatricula);
router.delete('/matricula/:id',verificarAutenticacion, eliminarMatricula);

export default router;