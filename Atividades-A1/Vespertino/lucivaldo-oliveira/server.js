const express = require("express");
const { listarProdutos, adicionarProduto } = require("./produtos");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API de produtos rodando no /produtos");
});

app.get("/produtos", (req, res) => {
  res.status(200).json(listarProdutos());
});

app.post("/produtos", (req, res) => {
  const { nome, preco } = req.body;


  const produto = adicionarProduto(nome, preco);

  res.status(201).json({
    mensagem: "Produto adicionado com sucesso",
    produto,
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
