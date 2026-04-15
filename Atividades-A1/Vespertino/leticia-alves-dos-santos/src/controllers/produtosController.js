/* lista produtos*/
const listaProdutos = require('../data/produtosData');

const getAllProdutos = (req, res) => {
  res.status(200).json(listaProdutos);
};
 
/* criar produto */
const criarProduto = (req, res) => {
  const { nome, preco } = req.body;

  if (!nome || preco === undefined) {
    return res.status(400).json({ message: "Nome e preço são obrigatórios" });
  }

  if (typeof preco !== "number" || preco < 0) {
    return res.status(400).json({ message: "Preço inválido" });
  }

  const novoProduto = {
    id: listaProdutos.reduce((maxId, produto) => Math.max(maxId, produto.id), 0) + 1,
    nome,
    preco,
    quantidade: 0
  };

  listaProdutos.push(novoProduto);
  res.status(201).json(novoProduto);
};

/* atualizar produto */
const atualizarProduto = (req, res) => {
  const { id } = req.params;
  const { nome, preco, quantidade } = req.body;

  const produto = listaProdutos.find(p => p.id === parseInt(id, 10));

  if (!produto) {
    return res.status(404).json({ message: "Produto não encontrado" });
  }

  if (nome !== undefined) produto.nome = nome;
  if (preco !== undefined) {
    if (typeof preco !== "number" || preco < 0) {
      return res.status(400).json({ message: "Preço inválido" });
    }
    produto.preco = preco;
  }
  if (quantidade !== undefined && typeof quantidade === "number" && quantidade >= 0) produto.quantidade = quantidade;

  res.status(200).json(produto);
};

/* deletar produto */
const deletarProduto = (req, res) => {
  const { id } = req.params;
  const index = listaProdutos.findIndex(p => p.id === parseInt(id, 10));
  if (index === -1) {
    return res.status(404).json({ message: "Produto não encontrado" });
  }
  listaProdutos.splice(index, 1);
  res.status(204).send();
};

/*buscar por id*/
const getProdutoById = (req, res) => {
  const { id } = req.params;
  const produto = listaProdutos.find(p => p.id === parseInt(id, 10));
  if (!produto) {
    return res.status(404).json({ message: "Produto não encontrado" });
  }
  res.status(200).json(produto);
};

module.exports = {
  getAllProdutos,
  criarProduto,
  atualizarProduto,
  deletarProduto,
  getProdutoById,
};

