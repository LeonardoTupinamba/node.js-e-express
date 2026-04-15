const express = require("express");
const app = express();
const port = 3000;
const routes = require("../routes/routes");

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Tudo ok no primeiro teste" });
});

app.use("/alunos", routes);

app.listen(port, () => {
  console.log(`Escutando na porta ${port}`);
});
