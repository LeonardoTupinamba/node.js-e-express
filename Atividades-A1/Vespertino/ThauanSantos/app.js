// Importa o express, rota alunos, aplicação express
const express = require('express');
const alunosRoutes = require('./src/routes/alunosRoutes');

const app = express();

// middleware que permite receber JSON ou dados de formulário urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// alunosRoutes define que todas as rotas que começam com /alunos levara ao arquivo alunosRoutes
app.use('/alunos', alunosRoutes);

// porta do servidor onde vai rodar
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});