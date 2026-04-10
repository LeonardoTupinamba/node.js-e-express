const express = require("express");
const send = require("send");
const app = express();
const port = 3000;

//a coisa toda vai aqui
//app.use(express.json());
const welcome = "Hello World!"


let tarefas = [
  { id: 1, descricao: "Estudar node.js", concluida: true },
  { id: 2, descricao: "Criar api com express", concluida: false },
];

//rota principal
app.get("/", (req, res) => {
  res.json(welcome);
});

app.get("/tarefas", (req, res) => {
  res.send(tarefas);
});

app.listen(port, () => {
  console.log(`Estou esutando na porta ${port}`);
});
