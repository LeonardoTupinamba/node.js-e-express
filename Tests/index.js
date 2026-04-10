const express = require("express");
const app = express();
app.use(express.json());

// Versao sem persistencia: ao reiniciar o servidor, os dados voltam ao inicial.
const tasks = [{ id: 1, titulo: "Estudar Express", status: "pendente" }];

app.get("/", (req, res) => {
  res.send("API de tarefas (sem persistencia) funcionando");
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});


app.post("/tasks", (req, res) => {
  if (!req.body.titulo) {
    return res.status(400).json({ erro: "O campo titulo e obrigatorio." });
  }

  const novaTarefa = {
    id: tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1,
    titulo: req.body.titulo,
    status: req.body.status || "pendente",
  };

  tasks.push(novaTarefa);
  return res.status(201).json(novaTarefa);
});



app.listen(3001, () =>
  console.log("Servidor sem persistencia rodando na porta 3001"),
);
