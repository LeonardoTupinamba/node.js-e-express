// server.js
const express = require("express");
require("dotenv").config(); // Carrega as variáveis de ambiente do arquivo .env

// Importações para o Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/swaggerConfig");

const authRoutes = require("./src/routes/authRoutes");
const tasksRoutes = require("./src/routes/tasksRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear o corpo das requisições em JSON
app.use(express.json());

// Rota para a documentação da API
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rota de "saúde" da API
app.get("/", (req, res) => {
  res.send("API de Tarefas com Autenticação JWT está no ar!");
});

// Carrega as rotas de autenticação sob o prefixo /auth
app.use("/auth", authRoutes);

// Carrega as rotas de tarefas sob o prefixo /tasks
app.use("/tasks", tasksRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app; // Exporta o app para ser usado nos testes
