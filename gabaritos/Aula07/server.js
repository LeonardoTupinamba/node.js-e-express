// server.js
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let produtos = [
  {
    id: 1,
    nome: "Notebook Gamer",
    preco: 7500,
    estoque: 30,
    categoria: "Eletrônicos",
  },
  {
    id: 2,
    nome: "Cadeira de Escritório",
    preco: 1200,
    estoque: 50,
    categoria: "Móveis",
  },
];
let nextId = 3;

// --- API RESTful Refatorada ---

// GET /produtos: Listar todos os produtos
app.get("/produtos", (req, res) => {
  res.status(200).json(produtos);
});

// GET /produtos/:id: Buscar um produto por ID
app.get("/produtos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const produto = produtos.find((p) => p.id === id);
  if (produto) {
    res.status(200).json(produto);
  } else {
    res.status(404).send("Produto não encontrado.");
  }
});

// POST /produtos: Adicionar um novo produto
app.post("/produtos", (req, res) => {
  const { nome, preco, estoque, categoria } = req.body;

  if (!nome || !preco) {
    return res.status(400).send("Nome e preço são obrigatórios.");
  }

  const novoProduto = {
    id: nextId++,
    nome,
    preco,
    estoque,
    categoria,
  };
  produtos.push(novoProduto);
  res.status(201).json(novoProduto);
});

// PUT /produtos/:id: Atualizar um produto
app.put("/produtos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = produtos.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).send("Produto não localizado.");
  }

  const { nome, preco, estoque, categoria } = req.body;
  if (!nome || !preco) {
    return res
      .status(400)
      .send("Nome e preço são obrigatórios para atualização.");
  }

  produtos[index] = { id, nome, preco, estoque, categoria };
  res.status(200).json(produtos[index]);
});

// DELETE /produtos/:id: Remover um produto
app.delete("/produtos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = produtos.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).send("Produto não encontrado.");
  }

  produtos.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
