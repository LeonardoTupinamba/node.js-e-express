# Aula 04: Middlewares no Express

## Visão geral

Esta aula aprofunda o uso do Express.js com foco em **middlewares**, um dos recursos mais importantes para organizar o fluxo de requisição e resposta em aplicações Node.js.

Um middleware é uma função executada durante o ciclo de requisição e resposta do Express. Ele recebe acesso aos objetos `req`, `res` e `next`, podendo executar código, modificar a requisição, modificar a resposta, encerrar o ciclo com uma resposta ou transferir o controle para a próxima etapa.

## Objetivos da aula

Ao final desta aula, você deverá ser capaz de:

- Compreender o conceito de middleware no Express e o papel da função `next()`.
- Utilizar `express.json()` para tratar requisições com corpo em JSON.
- Implementar um middleware de logging para registrar método, rota e horário das requisições.
- Criar um middleware simples de autenticação com token fixo para proteger rotas da API.

## Roteiro para o Aluno

1.  **Leitura**: Entenda o conceito de middleware e a função `next()` lendo os conceitos abaixo.
2.  **Laboratório**: Siga as instruções no arquivo [laboratorio.md](laboratorio.md) para adicionar logging e segurança à API de tarefas que você criou na Aula 03.
3.  **Teste**: Use o Postman ou Insomnia para verificar o funcionamento das rotas públicas e protegidas.

## Conceitos Fundamentais

### O que é um Middleware?

Um middleware é uma função que fica **no meio do caminho** entre a requisição do cliente e a resposta final do servidor.

**Analogia didática**: Uma forma simples de explicar middleware em sala é usar a analogia da **portaria de um condomínio**:

- O visitante chega ao prédio: essa é a requisição.
- A portaria registra a entrada: isso representa o logging.
- O porteiro pede identificação: isso representa autenticação.
- Se estiver tudo certo, a pessoa entra: isso equivale ao `next()`.
- Se houver problema, a entrada é bloqueada: isso corresponde a uma resposta como `401 Unauthorized`.

### A Cadeia de Middlewares e o `next()`

No Express, vários middlewares podem ser executados em sequência. Essa sequência é chamada de cadeia ou pilha de middlewares, e o avanço entre as etapas acontece por meio da chamada `next()`.

**Se um middleware não chamar `next()` e também não enviar resposta, a requisição fica “presa” no meio do caminho.**

```mermaid
graph LR
    A[Requisição] --> B{Middleware de Log};
    B -- next() --> C{Middleware de Auth};
    C -- Acesso Negado --> F[Resposta 401];
    C -- next() --> D[Rota Final];
    D --> E[Resposta 200];
```

### Exemplo 1 — Middleware básico

```js
const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log("Passei no middleware");
  next();
});

app.get("/", (req, res) => {
  res.json({ mensagem: "API funcionando!" });
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
```

### Exemplo 2 — Cadeia de middlewares

```js
const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log("Middleware 1");
  next();
});

app.use((req, res, next) => {
  console.log("Middleware 2");
  next();
});

app.get("/", (req, res) => {
  console.log("Rota final");
  res.send("OK");
});

app.listen(3000);
```

## Tipos Comuns de Middleware

### Middleware nativo: `express.json()`

O Express oferece middlewares nativos, e um dos mais usados é `express.json()`. Ele faz o parsing automático do corpo da requisição quando o cliente envia dados em JSON, tornando esses dados disponíveis em `req.body`.

#### Exemplo 3 — Recebendo JSON

```js
const express = require("express");
const app = express();

app.use(express.json());

app.post("/usuarios", (req, res) => {
  res.json({
    mensagem: "Usuário recebido com sucesso",
    dados: req.body,
  });
});

app.listen(3000);
```

**Teste sugerido no Postman ou Insomnia:**

- **Método:** `POST`
- **URL:** `http://localhost:3000/usuarios`
- **Body (JSON):** `{ "nome": "Maria", "idade": 22 }`

### Middleware de Logging

Logging é o registro das requisições que chegam ao servidor, uma prática importante para depuração, monitoramento e auditoria.

#### Exemplo 4 — Logging global

```js
const express = require("express");
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.get("/produtos", (req, res) => {
  res.json([{ id: 1, nome: "Mouse" }]);
});

app.listen(3000);
```

### Middleware de Autenticação Simples

A autenticação verifica se a requisição pode seguir para uma rota protegida. Um modelo didático é usar um token estático enviado em um cabeçalho como `x-access-token`.

#### Exemplo 5 — Middleware com token fixo

```js
const express = require("express");
const app = express();

app.use(express.json());

const autenticar = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (token === "meu-token-secreto") {
    next();
  } else {
    res.status(401).json({ mensagem: "Acesso não autorizado" });
  }
};

app.get("/publica", (req, res) => {
  res.json({ mensagem: "Rota pública liberada" });
});

app.get("/admin", autenticar, (req, res) => {
  res.json({ mensagem: "Bem-vindo à área protegida" });
});

app.listen(3000);
```

**Como testar:**

- **Requisição sem token para `/admin`:** Deve retornar `401 Unauthorized`.
- **Requisição com token para `/admin`:** Adicione o Header `x-access-token` com o valor `meu-token-secreto`. Deve retornar `200 OK`.

---

Agora que você entende a teoria, vamos aplicar esses conceitos na prática. Acesse o [laboratorio.md](laboratorio.md)!
