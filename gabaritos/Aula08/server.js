// server.js
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const basicAuth = require("express-basic-auth");

const app = express();
const PORT = 3000;

app.use(express.json());

// --- Configuração do Swagger ---
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API de Produtos",
      version: "1.0.0",
      description:
        "Uma API simples para gerenciar um cadastro de produtos, com documentação Swagger e autenticação.",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: "Servidor de Desenvolvimento",
      },
    ],
  },
  apis: ["server.js"], // Arquivos que contêm a documentação da API
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// --- Configuração da Autenticação Básica ---
const auth = basicAuth({
  users: { admin: "supersecret" }, // Em um app real, use variáveis de ambiente!
  challenge: true, // Exibe o prompt de login do navegador
  realm: "Imb4T3st4pp",
});

// --- Rota da Documentação ---
// A rota /api-docs é protegida por autenticação básica
app.use("/api-docs", auth, swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// --- Dados em Memória ---
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

// --- Documentação dos Componentes/Schemas ---
/**
 * @swagger
 * components:
 *   schemas:
 *     Produto:
 *       type: object
 *       required:
 *         - nome
 *         - preco
 *       properties:
 *         id:
 *           type: integer
 *           description: O ID gerado automaticamente para o produto.
 *         nome:
 *           type: string
 *           description: O nome do produto.
 *         preco:
 *           type: number
 *           format: float
 *           description: O preço do produto.
 *         estoque:
 *           type: integer
 *           description: A quantidade em estoque.
 *         categoria:
 *           type: string
 *           description: A categoria do produto.
 *       example:
 *         id: 1
 *         nome: "Notebook Gamer"
 *         preco: 7500
 *         estoque: 30
 *         categoria: "Eletrônicos"
 */

// --- Endpoints da API com Documentação ---

/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: API para gerenciamento de produtos
 */

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Retorna a lista de todos os produtos
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: A lista de produtos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produto'
 */
app.get("/produtos", (req, res) => {
  res.status(200).json(produtos);
});

/**
 * @swagger
 * /produtos/{id}:
 *   get:
 *     summary: Busca um produto pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID do produto.
 *     responses:
 *       200:
 *         description: O produto encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       404:
 *         description: Produto não encontrado.
 */
app.get("/produtos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const produto = produtos.find((p) => p.id === id);
  if (produto) {
    res.status(200).json(produto);
  } else {
    res.status(404).send("Produto não encontrado.");
  }
});

/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Produto'
 *           example:
 *             nome: "Mouse sem Fio"
 *             preco: 150
 *             estoque: 100
 *             categoria: "Periféricos"
 *     responses:
 *       201:
 *         description: O produto foi criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       400:
 *         description: Dados inválidos.
 */
app.post("/produtos", (req, res) => {
  const { nome, preco, estoque, categoria } = req.body;
  if (!nome || !preco) {
    return res.status(400).send("Nome e preço são obrigatórios.");
  }
  const novoProduto = { id: nextId++, nome, preco, estoque, categoria };
  produtos.push(novoProduto);
  res.status(201).json(novoProduto);
});

/**
 * @swagger
 * /produtos/{id}:
 *   put:
 *     summary: Atualiza um produto existente
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID do produto a ser atualizado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Produto'
 *           example:
 *             nome: "Cadeira de Escritório Ergonômica"
 *             preco: 1350
 *             estoque: 45
 *             categoria: "Móveis"
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       404:
 *         description: Produto não encontrado.
 *       400:
 *         description: Dados inválidos.
 */
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

/**
 * @swagger
 * /produtos/{id}:
 *   delete:
 *     summary: Remove um produto
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID do produto a ser removido.
 *     responses:
 *       204:
 *         description: Produto removido com sucesso.
 *       404:
 *         description: Produto não encontrado.
 */
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
