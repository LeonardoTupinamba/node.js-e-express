// src/server.js
const express = require("express");
const app = express();
const port = 3001;

const logger = require("./middlewares/logger");
const alunosRoutes = require("./routes/alunos");

// Middleware para parse de JSON
app.use(express.json());

// Middleware de logging colorido
app.use(logger);

// Rota principal
app.get("/", (req, res) => {
  res.send("Bem-vindo à API de Alunos!");
});

// Rotas de alunos
app.use("/alunos", alunosRoutes);

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
