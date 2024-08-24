import { Router } from 'express'
import {
    login,
    perfil,
    registro,
    detalleUsuario,
    actualizarPerfil,
    actualizarPassword,
    listarUsuarios
} from "../controllers/usuario.controller.js";

import { validacionUsuario } from '../middlewares/usuario.validation.js';
import verificarAutenticacion from '../middlewares/auth.js';

const router = Router()


router.post("/login", login);
router.post("/registro", validacionUsuario, registro);
router.get("/listarusuarios", verificarAutenticacion, listarUsuarios);

router.get("/perfil", verificarAutenticacion, perfil);
router.put('/usuario/actualizarpassword',verificarAutenticacion, actualizarPassword)
router.get("/usuario/:id", verificarAutenticacion, detalleUsuario);
router.put("/usuario/:id", verificarAutenticacion, actualizarPerfil);

export default router