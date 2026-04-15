# 🛒 API de Gerenciamento de Produtos

## 📌 Sobre o Projeto

Este projeto foi desenvolvido na disciplina de *Desenvolvimento Back-end*.

A aplicação consiste em uma **API REST em Node.js com Express** para gerenciamento de produtos.

Ela permite **listar, buscar, cadastrar, atualizar e remover produtos**, utilizando dados em memória, ideal para prática de rotas, controllers e middlewares.

---

## 👩‍💻 Desenvolvedora

**Letícia Alves dos Santos**

📅 **Data:** 10/04/2026

---

## ⚙️ Funcionalidades

A API permite:

* 📦 Listar todos os produtos
* 🔎 Buscar produto por ID
* ➕ Cadastrar novo produto
* ✏️ Atualizar nome, preço e quantidade
* 🗑️ Deletar produto por ID
* 📋 Registrar logs coloridos das requisições no terminal

---

## 🖥️ Tecnologias Utilizadas

* 🟢 Node.js
* 🚂 Express
* 🎨 Colors

---

## 🚀 Como Executar o Projeto

```bash
# Acessar a pasta do projeto
cd leticia-alves-dos-santos

# Instalar dependências
npm install

# Rodar o servidor
node server.js
```

Servidor disponível em:

```text
http://localhost:3000
```

Opcional (com recarregamento automático):

```bash
node --watch server.js
```

---

## 🔗 Endpoints

Base URL: **http://localhost:3000**

### 1. Listar produtos

**GET /produtos**

Retorna todos os produtos cadastrados.

* ✅ Status: **200 OK**

### 2. Buscar produto por ID

**GET /produtos/:id**

Retorna um produto específico.

* ✅ Status: **200 OK**
* ❌ Erro: **404 Not Found** (produto não encontrado)

### 3. Criar produto

**POST /produtos**

Cria um novo produto.

Body esperado:

```json
{
	"nome": "Café",
	"preco": 12.5
}
```

* ✅ Status: **201 Created**
* ❌ Erro: **400 Bad Request** (nome e preço obrigatórios)

Observação: o campo **quantidade** é iniciado com valor **0**.

### 4. Atualizar produto

**PUT /produtos/:id**

Atualiza dados do produto (nome, preço e/ou quantidade).

Body de exemplo:

```json
{
	"nome": "Café Premium",
	"preco": 14.9,
	"quantidade": 20
}
```

* ✅ Status: **200 OK**
* ❌ Erro: **404 Not Found** (produto não encontrado)

### 5. Deletar produto

**DELETE /produtos/:id**

Remove um produto pelo ID.

* ✅ Status: **204 No Content**
* ❌ Erro: **404 Not Found** (produto não encontrado)

---

## 🗂️ Estrutura do Projeto

```text
.
├── node_modules/
├── tests/
│   ├── delete-produtos.png
│   ├── erro-404.png
│   ├── erro-nome-vazio.png
│   ├── erro-preco-invalido.png
│   ├── erro-validacao.png
│   ├── get-produtos-id.png
│   ├── get-produtos.png
│   ├── post-produtos.png
│   └── put-produtos.png
├── server.js
├── package-lock.json
├── package.json
├── README.md
└── src
    ├── controllers
    │   └── produtosController.js
    ├── data
    │   └── produtosData.js
    ├── middlewares
    │   └── logger.js
    └── routes
        └── produtosRoutes.js
```

---

## 🧪 Evidências de Teste

Na pasta **tests** estão os prints dos testes manuais dos endpoints e cenários de erro da API.

---

## 📝 Licença

Este projeto foi desenvolvido para fins acadêmicos.
