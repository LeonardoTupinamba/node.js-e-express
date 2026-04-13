const express = require("express");
//import express from "express";
const app = express();
const port = 3000;
const colors = require("colors");
//import colors from "colors";
const {valorDoEstoque} = require("./processar.js");
//import { valorDoEstoque } from "./processar";

//Middleware padrão do express
app.use(express.json());

//Middleware de LOG
app.use((req, res, next) => {

    if (req.method === "GET") {
        console.log(`${[new Date().toLocaleString("pt-BR")]} ${req.method} ${req.url}`.blue);
    }else if(req.method === "POST") {
        console.log(`${[new Date().toLocaleString("pt-BR")]} ${req.method} ${req.url}`.green);
    }else if(req.method === "PUT") {
        console.log(`${[new Date().toLocaleString("pt-BR")]} ${req.method} ${req.url}`.yellow);
    }else if(req.method === "DELETE") {
        console.log(`${[new Date().toLocaleString("pt-BR")]} ${req.method} ${req.url}`.red);
    }
    
    next();
});

//Middleware de Autenticação
const autenticacao = (req, res, next) => {
    const token = req.headers['auth'];
    
    if (token !== "999") {
        return res.status(401).json({erro : "Token inválido. Acesso não autorizado!"});
    }
    next();
}


//Rota padrão
app.get("/", (req, res) => {
    res.send("Seja bem vindo a API de Produtos!");
});

//Possui id, nome, valor, e descricao 
const produtos = [];


//Listagem de produto
app.get("/produtos", (req, res) => {
    res.status(200).json(produtos)
});


//Filtro de produto
app.get("/produtos/:id",  (req, res) => {
    const id = Number(req.params.id);

    const produto = produtos.find(produto => produto.idProduto === id);
    
    if (!produto) {
        return res.status(404).json({erro : "Não existe produto com o id informado."})
    }

    const valEstoque = valorDoEstoque(produto.qtdeEstoque, produto.valorProduto);

    res.status(200).json({produto, "Valor total do estoque" : valEstoque });
});


//Adicionando novo produto
app.post("/produtos", autenticacao, (req, res) => {
    const id = produtos.length > 0? Math.max(...produtos.map(prod => prod.idProduto)) + 1 : 1;

    if(!req.body.nome) {
        return res.status(404).json({erro: "Informe o nome do produto."})
    }
    
    if(!req.body.valor) {
        return res.status(404).json({erro: "Informe o valor do produto."})
    }

    if(!req.body.qtde) {
        return res.status(404).json({erro: "Informe a quantidade do produto em estoque."})
    }

    const novoProduto = {
        idProduto : id,
        nomeProduto : req.body.nome,
        valorProduto : req.body.valor,
        descricaoProduto : req.body.descricao || "" ,
        qtdeEstoque : req.body.qtde
    }

    produtos.push(novoProduto);
    res.status(201).json(novoProduto);
});


//Atualização de um produto
app.put("/produtos/:id", autenticacao, (req, res) => {
    const id = Number(req.params.id);

    const produto = produtos.find(produto => produto.idProduto === id);

    if(!produto){
        return res.status(404).json({erro : "Não existe produto com o id informado."})
    }

    produto.nomeProduto = req.body.nome || produto.nomeProduto;
    produto.valorProduto = req.body.valor || produto.valorProduto;
    produto.descricaoProduto = req.body.descricao || produto.descricaoProduto;
    produto.qtdeEstoque = req.body.qtde || produto.qtdeEstoque;

    res.status(204).send()
});


//Removendo um produto
app.delete("/produtos/:id", autenticacao, (req, res) => {
    const id = Number(req.params.id);

    const indexPosition = produtos.findIndex(produto => produto.idProduto = id)

    if(indexPosition === -1) {
        return res.status(404).json({erro: "Não existe produto com o id informado."});
    }

    produtos.splice(indexPosition, 1);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Servidor escutando requisições na porta ${port}.\nAcesse o API em http://localhost:3000`);
});