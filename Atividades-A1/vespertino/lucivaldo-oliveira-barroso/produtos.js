const produtos = [
  {
    id: 1,
    nome: "Caderno",
    preco: 15.00,
  },
  {
    id: 2,
    nome: "Caneta",
    preco: 3.00,
  },
];

function listarProdutos() {
  return produtos;
}

function adicionarProduto(nome, preco) {
  const produto = {
    id: produtos.length + 1,
    nome,
    preco,
  };

  produtos.push(produto);

  return produto;
}

module.exports = {
  listarProdutos,
  adicionarProduto,
};
