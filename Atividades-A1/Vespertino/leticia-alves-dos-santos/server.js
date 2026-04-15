const express = require('express');
const app = express();

const produtosRoutes = require('./src/routes/produtosRoutes');
const logger = require('./src/middlewares/logger');

// middleware para JSON
app.use(express.json());

// middleware logger
app.use(logger);

// rotas
app.use(produtosRoutes);

// porta
const port = 3000;

// iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});