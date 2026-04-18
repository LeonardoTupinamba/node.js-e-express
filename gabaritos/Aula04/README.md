# Gabarito - Aula 04

## Objetivo

O objetivo era que o aluno adicionasse duas camadas de middleware a uma API Express existente: um para logging de requisições e outro para autenticação baseada em token estático, protegendo rotas específicas.

## Checklist de Verificação

- [ ] O aluno copiou o código da Aula 03 como base?
- [ ] Foi criado um middleware global (`app.use`) para logging que exibe método, URL e chama `next()`?
- [ ] O middleware de logging está posicionado **antes** das definições de rota?
- [ ] Foi criada uma função `autenticar` que atua como middleware?
- [ ] A função `autenticar` lê o cabeçalho `x-token` da requisição (`req.headers`)?
- [ ] A função retorna um status `401` se o token for inválido ou não existir? (Importante: ela deve usar `return` para parar a execução).
- [ ] A função chama `next()` se o token for válido?
- [ ] O middleware `autenticar` foi aplicado corretamente às rotas `POST /tarefas`, `PUT /tarefas/:id` e `DELETE /tarefas/:id`?
- [ ] A rota `GET /tarefas` permaneceu pública (sem o middleware de autenticação)?
- [ ] O aluno conseguiu testar e validar todos os cenários (sem token, token inválido, token válido) no Postman?

## Solução Completa do Laboratório

O arquivo `Aula04/src/server.js` deve ter a seguinte estrutura:

```javascript
const express = require("express");
const app = express();
const port = 3000;

// 1. Middleware de parsing de JSON
app.use(express.json());

// 2. Middleware de Logging (global)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// 3. Middleware de Autenticação (função reutilizável)
function autenticar(req, res, next) {
  const token = req.headers["x-token"];

  if (token !== "123456") {
    return res.status(401).json({ erro: "Token inválido. Acesso negado." });
  }

  next();
}

// "Banco de dados" em memória
let tarefas = [
  { id: 1, descricao: "Estudar Node.js", concluida: true },
  { id: 2, descricao: "Criar API com Express", concluida: false },
];

// --- ROTAS ---

// Rota pública
app.get("/tarefas", (req, res) => {
  res.json(tarefas);
});

// Rotas protegidas
app.post("/tarefas", autenticar, (req, res) => {
  const novaTarefa = {
    id: tarefas.length > 0 ? Math.max(...tarefas.map((t) => t.id)) + 1 : 1,
    descricao: req.body.descricao,
    concluida: req.body.concluida || false,
  };
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

app.put("/tarefas/:id", autenticar, (req, res) => {
  const idTarefa = parseInt(req.params.id);
  const tarefa = tarefas.find((t) => t.id === idTarefa);
  if (!tarefa) {
    return res.status(404).json({ erro: "Tarefa não encontrada" });
  }
  tarefa.descricao = req.body.descricao || tarefa.descricao;
  if (req.body.concluida !== undefined) {
    tarefa.concluida = req.body.concluida;
  }
  res.json(tarefa);
});

app.delete("/tarefas/:id", autenticar, (req, res) => {
  const idTarefa = parseInt(req.params.id);
  const index = tarefas.findIndex((t) => t.id === idTarefa);
  if (index === -1) {
    return res.status(404).json({ erro: "Tarefa não encontrada" });
  }
  tarefas.splice(index, 1);
  res.status(204).send();
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
```

## Pontos Comuns de Dificuldade

- **Ordem dos Middlewares**: Colocar o middleware de logging depois das rotas fará com que ele não seja executado para aquelas rotas. A ordem em `app.use()` é crucial.
- **Esquecer o `next()`**: Um erro clássico. Se o `next()` for esquecido no middleware de logging, a aplicação inteira irá travar, pois nenhuma requisição passará dele.
- **Não usar `return` ao bloquear**: No middleware de autenticação, se o aluno escrever `res.status(401).json(...)` sem o `return` na frente, o código continuará e chamará `next()` em seguida, o que pode causar um erro de "Cannot set headers after they are sent to the client".
- **Diferença entre `app.use(middleware)` e `app.get('/rota', middleware, ...)`**: Reforçar que `app.use` sem um caminho aplica o middleware a **todas** as requisições que vêm depois, enquanto passá-lo como argumento de uma rota o aplica apenas àquela rota específica.
