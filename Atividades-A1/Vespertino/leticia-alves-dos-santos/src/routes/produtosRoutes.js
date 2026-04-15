const express = require('express');
const router = express.Router();

const {
  getAllProdutos,
  criarProduto,
  atualizarProduto,
  deletarProduto,
  getProdutoById
} = require('../controllers/produtosController');

// rotas
router.get('/produtos', getAllProdutos);
router.post('/produtos', criarProduto);
router.put('/produtos/:id', atualizarProduto);
router.delete('/produtos/:id', deletarProduto);
router.get('/produtos/:id', getProdutoById);

module.exports = router;