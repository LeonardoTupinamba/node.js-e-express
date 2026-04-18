// src/routes/tasksRoutes.js
const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasksController");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Tarefas
 *   description: Endpoints para gerenciamento de tarefas (requer autenticação).
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-gerado da tarefa.
 *         user_id:
 *           type: integer
 *           description: ID do usuário proprietário da tarefa.
 *         title:
 *           type: string
 *           description: Título da tarefa.
 *         description:
 *           type: string
 *           description: Descrição detalhada da tarefa.
 *         completed:
 *           type: boolean
 *           description: Indica se a tarefa foi concluída.
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Data e hora de criação da tarefa.
 *       example:
 *         id: 1
 *         user_id: 1
 *         title: "Comprar leite"
 *         description: "Lembrar de comprar leite integral no mercado."
 *         completed: false
 *         created_at: "2026-04-17T14:30:00.000Z"
 */

// Todas as rotas de tarefas são protegidas pelo middleware de autenticação
router.use(authMiddleware);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Lista todas as tarefas do usuário autenticado
 *     tags: [Tarefas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de tarefas retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       '401':
 *         description: Não autorizado (token inválido ou não fornecido).
 *       '500':
 *         description: Erro interno do servidor.
 */
router.get("/", tasksController.getAllTasks);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Busca uma tarefa específica pelo ID
 *     tags: [Tarefas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da tarefa.
 *     responses:
 *       '200':
 *         description: Tarefa encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       '401':
 *         description: Não autorizado.
 *       '404':
 *         description: Tarefa não encontrada ou não pertence ao usuário.
 *       '500':
 *         description: Erro interno do servidor.
 */
router.get("/:id", tasksController.getTaskById);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Cria uma nova tarefa
 *     tags: [Tarefas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Estudar Swagger"
 *               description:
 *                 type: string
 *                 example: "Aprender a documentar APIs com Swagger."
 *     responses:
 *       '201':
 *         description: Tarefa criada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       '400':
 *         description: O título da tarefa é obrigatório.
 *       '401':
 *         description: Não autorizado.
 *       '500':
 *         description: Erro interno do servidor.
 */
router.post("/", tasksController.createTask);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Atualiza uma tarefa existente
 *     tags: [Tarefas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da tarefa a ser atualizada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Estudar TDD"
 *               description:
 *                 type: string
 *                 example: "Aprender a fazer testes antes do código."
 *               completed:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       '200':
 *         description: Tarefa atualizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       '400':
 *         description: O título não pode ser vazio.
 *       '401':
 *         description: Não autorizado.
 *       '404':
 *         description: Tarefa não encontrada ou não pertence ao usuário.
 *       '500':
 *         description: Erro interno do servidor.
 */
router.put("/:id", tasksController.updateTask);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Deleta uma tarefa
 *     tags: [Tarefas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da tarefa a ser deletada.
 *     responses:
 *       '204':
 *         description: Tarefa deletada com sucesso (sem conteúdo).
 *       '401':
 *         description: Não autorizado.
 *       '404':
 *         description: Tarefa não encontrada ou não pertence ao usuário.
 *       '500':
 *         description: Erro interno do servidor.
 */
router.delete("/:id", tasksController.deleteTask);

module.exports = router;
