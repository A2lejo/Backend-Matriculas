import { Router } from "express";

import {
    actualizarEstudiante,
    detalleEstudiante,
    eliminarEstudiante,
    listarEstudiantes,
    registrarEstudiante,
} from "../controllers/estudiante.controller.js";
import verificarAutenticacion from "../middlewares/auth.js";

const router = Router();

router.post("/estudiantes/registro", verificarAutenticacion, registrarEstudiante);
router.get("/estudiantes", verificarAutenticacion, listarEstudiantes);
router.get("/estudiante/:cedula",verificarAutenticacion, detalleEstudiante);
router.put("/estudiante/:cedula",verificarAutenticacion, actualizarEstudiante);
router.delete("/estudiante/:cedula",verificarAutenticacion, eliminarEstudiante);

export default router;