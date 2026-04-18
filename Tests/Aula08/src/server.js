// Importações principais
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger"); // Importa config do swagger

const app = express();
const port = 3000;

// Middleware para interpretar JSON no body das requisições
app.use(express.json());

// Importa conexão com banco
const db = require("./db");

/**
 * =========================================================
 * 🔹 Swagger - Schema (modelo de dados)
 * =========================================================
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: "Estudar Node.js"
 *         description:
 *           type: string
 *           example: "Aprender Swagger"
 *         status:
 *           type: string
 *           example: "pendente"
 *         user_id:
 *           type: integer
 *           example: 10
 */

// Rota da documentação Swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * =========================================================
 * 🔹 ROTAS
 * =========================================================
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Rota principal da API
 *     description: Retorna uma mensagem de boas-vindas
 *     responses:
 *       200:
 *         description: API funcionando
 */
app.get("/", (req, res) => {
  res.send("Bem-vindo à API de tasks!");
});

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Lista todas as tarefas
 *     description: Retorna todas as tarefas cadastradas no banco
 *     responses:
 *       200:
 *         description: Lista de tarefas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
app.get("/tasks", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM tasks ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro no servidor");
  }
});

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Busca uma tarefa por ID
 *     description: Retorna uma única tarefa com base no ID informado
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da tarefa
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tarefa encontrada
 *       404:
 *         description: Tarefa não encontrada
 */
app.get("/tasks/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query("SELECT * FROM tasks WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).send("Tarefa não encontrada.");
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro no servidor");
  }
});

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Cria uma nova tarefa
 *     description: Insere uma nova tarefa no banco de dados
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - user_id
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *               user_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *       400:
 *         description: Dados inválidos
 */
app.post("/tasks", async (req, res) => {
  const { title, description, status, user_id } = req.body;

  // Validação básica
  if (!title || !user_id) {
    return res.status(400).send("Título e user_id são obrigatórios.");
  }

  const query = `
    INSERT INTO tasks (title, description, status, user_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const values = [title, description || null, status || "pendente", user_id];

  try {
    const result = await db.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro no servidor");
  }
});

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Atualiza uma tarefa
 *     description: Atualiza os dados de uma tarefa existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da tarefa
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 *       404:
 *         description: Tarefa não encontrada
 */
app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  try {
    // Busca tarefa atual
    const currentTaskResult = await db.query(
      "SELECT * FROM tasks WHERE id = $1",
      [id],
    );

    if (currentTaskResult.rows.length === 0) {
      return res.status(404).send("Tarefa não encontrada.");
    }

    const currentTask = currentTaskResult.rows[0];

    // Mantém valores antigos se não forem enviados
    const newTitle = title || currentTask.title;
    const newDescription = description || currentTask.description;
    const newStatus = status || currentTask.status;

    const updateQuery = `
      UPDATE tasks
      SET title = $1, description = $2, status = $3
      WHERE id = $4
      RETURNING *;
    `;

    const values = [newTitle, newDescription, newStatus, id];

    const result = await db.query(updateQuery, values);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro no servidor");
  }
});

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Remove uma tarefa
 *     description: Exclui uma tarefa do banco de dados
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da tarefa
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Tarefa removida com sucesso
 *       404:
 *         description: Tarefa não encontrada
 */
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      "DELETE FROM tasks WHERE id = $1 RETURNING *",
      [id],
    );

    if (result.rowCount === 0) {
      return res.status(404).send("Tarefa não encontrada.");
    }

    // 204 = sucesso sem conteúdo
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro no servidor");
  }
});

// Inicializa servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log(`Swagger em http://localhost:${port}/docs`);
});
