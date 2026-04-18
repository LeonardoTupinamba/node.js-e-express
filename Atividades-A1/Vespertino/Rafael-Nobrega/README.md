# API de Produtos

Uma API simples desenvolvida com Node.js e Express para gerenciamento de produtos em memória.

Este projeto foi desenvolvido como parte de uma atividade prática para consolidar conceitos de rotas, módulos e middlewares.
## Desenvolvedor 

Feito por: 
Rafael Nóbrega de Lima 🧑🏽‍💻


## Tecnologias usadas
- Node.js
- Express
- JavaScript
## Estrutura de pastas
```
├── src
│   ├── routes
│   ├── controllers
│   ├── data
│   ├── middlewares
│   └── app.js
├── package.json
└── README.md
```

## Funcionalidades da Api

- Listar produtos 
- Adicionar produtos
- Atualizar produtos
- Deletar produtos
## Como executar o projeto

1. Clone o repositório:
```bash 
git clone https://github.com/KylixXD/node.js-e-express.git
```
2. Mudar para seu repositório

```bash
# Mudar para a pasta de Atividades
cd Atividades-01

# Mudar para a pasta do turno Vespertino
cd Vespertino

# Mudar para a pasta do projeto
cd Rafael-Nobrega

# Mudar para a raiz do projeto
cd src
```

3.  Inicie o Servidor 

```bash
npm install 
```

O Servidor estará rodando em: 
http://localhost:3000
## Rotas da API


```json
## Rotas

### GET /produtos
Lista todos os produtos.

Resposta: 200 OK

----------------------------

### POST /produtos
Adiciona um novo produto.

Exemplo de body:
```json
{
  "nome": "Mangá One Piece n1 ",
  "preco": 24.20
}

Resposta: 201 CREATED

----------------------------

### PUT /produtos/:id
Atualizar um produto.

Exemplo de EndPoint:
localhost:3000/produtos/5

Exemplo de body:
```json
{
  "nome": "Mangá Dragon Ball Super n1 ",
  "preco": 28.50
}

Resposta: 200 OK
```
----------------------------

### Delete /produtos/:id
Deletar um produto.

Exemplo de EndPoint:
localhost:3000/produtos/4

```json
Resposta: 204 NO CONTENT

```


##  6. Middleware

é um código executado antes que uma requisição seja concluída, agindo "na borda" (edge) antes de renderizar páginas ou acessar rotas

A aplicação possui um middleware que registra no console todas as requisições realizadas na API.

## Testes

Os testes foram realizados utilizando o Insomnia.

Exemplos de testes realizados:

- Listagem de produtos (GET)
- Criação de produto (POST)
- Atualização de produto (PUT)
- Remoção de produto (DELETE)