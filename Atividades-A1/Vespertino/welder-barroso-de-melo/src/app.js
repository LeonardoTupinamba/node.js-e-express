const express = require("express");
const alunosRouter = require("./routes/alunos");

const app = express();

// Middleware para receber JSON no corpo das requisições
app.use(express.json());

// Registra as rotas sob o prefixo /alunos
app.use("/alunos", alunosRouter);

module.exports = app;
