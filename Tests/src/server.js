// server.js
const express = require("express");
const db = require("./db"); // Importa o módulo do banco de dados

const app = express();
const PORT = 3000;

app.use(express.json());

// --- ROTAS DA API ---

// GET /tasks: Listar todas as tarefas
app.get("/tasks", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM tasks ORDER BY id ASC");
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar tarefas.");
  }
});

// GET /tasks/:id: Buscar uma tarefa por ID
app.get("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query("SELECT * FROM tasks WHERE id = $1", [id]);
    if (rows.length === 0) {
      return res.status(404).send("Tarefa não encontrada.");
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar a tarefa.");
  }
});

// POST /tasks: Criar uma nova tarefa
app.post("/tasks", async (req, res) => {
  const { title, description, status, due_date, user_id } = req.body;

  if (!title || !user_id) {
    return res.status(400).send("Título e user_id são obrigatórios.");
  }

  try {
    const { rows } = await db.query(
      "INSERT INTO tasks (title, description, status, due_date, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, description, status || "pendente", due_date, user_id],
    );
    console.log("Tarefa criada:", rows[0]);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao criar a tarefa.");
  }
});

// PUT /tasks/:id: Atualizar uma tarefa
app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, status, due_date } = req.body;

  if (!title || !status) {
    return res
      .status(400)
      .send("Título e status são obrigatórios para atualização.");
  }

  try {
    const { rows } = await db.query(
      "UPDATE tasks SET title = $1, description = $2, status = $3, due_date = $4 WHERE id = $5 RETURNING *",
      [title, description, status, due_date, id],
    );

    if (rows.length === 0) {
      return res.status(404).send("Tarefa não encontrada para atualizar.");
    }

    console.log("Tarefa atualizada:", rows[0]);
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao atualizar a tarefa.");
  }
});

// PATCH /tasks/:id: Atualizar parcialmente uma tarefa
app.patch("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const fields = req.body;
  const fieldKeys = Object.keys(fields);

  if (fieldKeys.length === 0) {
    return res.status(400).send("Nenhum campo fornecido para atualização.");
  }

  try {
    // Busca os dados atuais da tarefa
    const { rows: currentTaskRows } = await db.query(
      "SELECT * FROM tasks WHERE id = $1",
      [id],
    );

    if (currentTaskRows.length === 0) {
      return res.status(404).send("Tarefa não encontrada para atualizar.");
    }

    const currentTask = currentTaskRows[0];
    const updatedTask = { ...currentTask, ...fields };

    const { rows } = await db.query(
      "UPDATE tasks SET title = $1, description = $2, status = $3, due_date = $4 WHERE id = $5 RETURNING *",
      [
        updatedTask.title,
        updatedTask.description,
        updatedTask.status,
        updatedTask.due_date,
        id,
      ],
    );

    console.log("Tarefa atualizada parcialmente:", rows[0]);
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao atualizar a tarefa parcialmente.");
  }
});

// DELETE /tasks/:id: Deletar uma tarefa
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("DELETE FROM tasks WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).send("Tarefa não encontrada para deletar.");
    }

    console.log(`Tarefa com ID ${id} foi deletada.`);
    res.status(204).send(); // No Content
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao deletar a tarefa.");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
