const express = require('express');
const alunosRoutes = require('./routes/alunos');
const logger = require('./middlewares/logger');

const app = express();

app.use(express.json());
app.use(logger); // middleware de logging para todas as rotas

app.use('/alunos', alunosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});