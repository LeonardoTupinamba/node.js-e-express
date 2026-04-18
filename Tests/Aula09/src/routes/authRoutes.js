// src/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Endpoints para registro e login de usuários.
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - username
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome completo do usuário.
 *                 example: "João da Silva"
 *               username:
 *                 type: string
 *                 description: Nome de usuário único para login.
 *                 example: "joaosilva"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email único do usuário.
 *                 example: "joao.silva@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Senha do usuário (mínimo 6 caracteres).
 *                 example: "senha123"
 *     responses:
 *       '201':
 *         description: Usuário registrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *       '400':
 *         description: Dados de entrada inválidos.
 *       '409':
 *         description: Usuário ou email já cadastrado.
 *       '500':
 *         description: Erro interno do servidor.
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Autentica um usuário e retorna um token JWT
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nome de usuário para login.
 *                 example: "joaosilva"
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Senha do usuário.
 *                 example: "senha123"
 *     responses:
 *       '200':
 *         description: Login bem-sucedido. Retorna o token e informações do usuário.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     username:
 *                       type: string
 *       '400':
 *         description: Usuário e senha são obrigatórios.
 *       '401':
 *         description: Senha inválida.
 *       '404':
 *         description: Usuário não encontrado.
 *       '500':
 *         description: Erro interno do servidor.
 */
router.post("/login", authController.login);

module.exports = router;
