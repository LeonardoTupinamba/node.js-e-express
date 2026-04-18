const express = require('express');
const port = 3000;
const alunosRoutes = require('./routes/alunos.routes');

const app = express();

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Rotas
app.use('/alunos', alunosRoutes);

// Rota raiz de boas-vindas
app.get('/', (req, res) => {
  res.status(200).json({
    mensagem: 'API de Alunos funcionando!',
    rotas: {
      listar: 'GET /alunos',
      criar: 'POST /alunos',
    },
  });
});

module.exports = app;
