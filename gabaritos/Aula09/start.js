// start.js
const app = require("./server"); // Importa a instância do app Express
require("dotenv").config();

const PORT = process.env.PORT || 3000;

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  if (process.env.NODE_ENV === "production") {
    console.log("Rodando em ambiente de PRODUÇÃO!");
  } else if (process.env.NODE_ENV === "test") {
    console.log("Rodando em ambiente de TESTE.");
  } else {
    console.log("Rodando em ambiente de DESENVOLVIMENTO.");
  }
});
