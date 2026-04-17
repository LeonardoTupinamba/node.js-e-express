const express = require("express");
require("colors");
const alunosRouter = require("./src/alunosRoutes");

const app = express();
const port = 3000;

app.use(express.json());

app.use((req, res, next) => {
  const startedAt = Date.now();

  res.on("finish", () => {
    const status = res.statusCode;
    const elapsedMs = Date.now() - startedAt;
    let coloredStatus = String(status);

    if (status >= 500) {
      coloredStatus = coloredStatus.red;
    } else if (status >= 400) {
      coloredStatus = coloredStatus.yellow;
    } else if (status >= 300) {
      coloredStatus = coloredStatus.cyan;
    } else {
      coloredStatus = coloredStatus.green;
    }

    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - ${coloredStatus} (${elapsedMs}ms)`);
  });

  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Bem-vindo à API de alunos da Atividade A1" });
});

app.use("/alunos", alunosRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});