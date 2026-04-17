const express = require("express");
const app = express();
const alunosRoutes = require("./routes/alunos");

app.use(express.json());

app.use("/alunos", alunosRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});