//Retorna o valor total em dinheiro do estoque de um prouto
const valorDoEstoque = (qtdeEstoque, valorUnitario) => {
    return qtdeEstoque * valorUnitario;
};

module.exports = { valorDoEstoque };
//export { valorDoEstoque };