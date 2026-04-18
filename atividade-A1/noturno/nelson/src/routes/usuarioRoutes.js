import express from "express";
import * as usuarioController from "../controllers/usuarioController.js";

const router = express.Router();

router.get("/usuarios", usuarioController.listarUsuarios);
router.get("/usuarios/:id", usuarioController.buscarUsuarioPorId);
router.post("/usuarios", usuarioController.criarUsuario);
router.put("/usuarios/:id", usuarioController.atualizarUsuario);
router.delete("/usuarios/:id", usuarioController.deletarUsuario);

export default router;