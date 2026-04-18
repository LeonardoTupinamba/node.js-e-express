# API de Produtos

Essa atividade foi feita para o Nivel 1 da A1 de Node.js e Express.

Eu criei uma API simples de produtos usando Express. Ela guarda os produtos em memoria, ou seja, quando o servidor reinicia, os produtos novos adicionados somem.

## Como rodar

Primeiro instale as dependencias:

```bash
npm install
```

Depois rode o servidor:

```bash
npm start
```

O servidor vai abrir em:

```text
http://localhost:3000
```

## Rotas

Listar produtos:

```text
GET http://localhost:3000/produtos
```

Adicionar produto:

```text
POST http://localhost:3000/produtos
```

Exemplo de JSON para adicionar:

```json
{
  "nome": "Lapis",
  "preco": 2
}
```

## O que foi usado

- Node.js
- Express
- Um modulo separado no arquivo `produtos.js`
- `express.json()` para receber dados em JSON
