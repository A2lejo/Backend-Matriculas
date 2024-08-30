import { Router } from "express";

import {
    detalleMateria,
    ListarMaterias,
    registrarMateria,
    actualizarMateria,
    eliminarMateria,
} from "../controllers/materia.controller.js";
import verificarAutenticacion from "../middlewares/auth.js";

const router = Router();

router.post('/materia/registro',verificarAutenticacion, registrarMateria);
router.get("/materias", verificarAutenticacion, ListarMaterias);


router
    .route('/materia/:codigo')
    .get(verificarAutenticacion, detalleMateria)
    .put(verificarAutenticacion, actualizarMateria)
    .delete(verificarAutenticacion, eliminarMateria)

export default router