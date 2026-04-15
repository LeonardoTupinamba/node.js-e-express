# 📚 API de Alunos

## 📌 Descrição

Esta é uma API simples desenvolvida com Node.js e Express para gerenciamento de alunos.
O projeto tem como objetivo praticar conceitos de rotas, módulos, middlewares e manipulação de requisições HTTP.

---

## 🚀 Tecnologias utilizadas

* Node.js
* Express

---

## 📁 Estrutura do projeto

```
src/
├── app.js
├── routes/
│   └── alunos.js
├── data/
│   └── alunos.js
└── middlewares/
    └── logger.js
```

---

## ▶️ Como executar o projeto

1. Instale as dependências:

```
npm install
```

2. Execute o servidor:

```
node --watch src/app.js
```

3. O servidor estará disponível em:

```
http://localhost:3000
```

---

## Rotas da API

### GET /alunos

Lista todos os alunos

* Status: 200 OK

---

### POST /alunos

Adiciona um novo aluno

**Body (JSON):**

```
{
  "nome": "Maria"
}
```

* Status: 201 Created
* Status: 400 Bad Request (se nome não for informado)

---

### PUT /alunos/:id

Atualiza o nome de um aluno

**Body (JSON):**

```
{
  "nome": "Novo Nome"
}
```

* Status: 200 OK
* Status: 404 Not Found

---

### DELETE /alunos/:id

Remove um aluno

* Status: 204 No Content
* Status: 404 Not Found

---

## Middleware

A aplicação possui um middleware de log que registra todas as requisições recebidas:

Exemplo no terminal:

```
Requisição recebida: GET /alunos
```

---

## Testes realizados

Os testes foram realizados utilizando o Postman e o terminal com curl.

### Testes executados:

* GET /alunos → retorno da lista
* POST /alunos → criação de aluno
* PUT /alunos/:id → atualização de aluno
* DELETE /alunos/:id → remoção de aluno

---

## Objetivo do projeto

* Praticar o uso do Express
* Entender o funcionamento de rotas HTTP
* Trabalhar com dados em memória
* Aplicar conceitos de organização de código
* Implementar middleware simples

---

## Observações

* Os dados são armazenados em memória (não há banco de dados)
* Ao reiniciar o servidor, os dados são resetados

---

## Autor

Desenvolvido por Daniel Cassiano
