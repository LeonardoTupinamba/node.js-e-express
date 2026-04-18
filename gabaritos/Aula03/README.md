# Gabarito - Aula 03

## Objetivo

O objetivo era que o aluno construísse uma API RESTful básica com Express, implementando as quatro operações CRUD (Create, Read, Update, Delete) para gerenciar uma lista de tarefas em memória.

## Checklist de Verificação

- [ ] O aluno criou a pasta `Aula03` e a subpasta `src`?
- [ ] O projeto foi inicializado com `npm init -y`?
- [ ] O `express` foi instalado como dependência?
- [ ] O arquivo `server.js` foi criado e o servidor foi iniciado corretamente na porta 3000?
- [ ] O middleware `express.json()` foi adicionado para permitir o parsing de JSON?
- [ ] A rota `GET /tarefas` foi implementada e retorna a lista de tarefas?
- [ ] A rota `POST /tarefas` foi implementada, cria uma nova tarefa e retorna o status `201`?
- [ ] A rota `PUT /tarefas/:id` foi implementada, atualiza a tarefa correta e lida com o caso de ID não encontrado (retornando `404`)?
- [ ] A rota `DELETE /tarefas/:id` foi implementada, remove a tarefa da lista e retorna o status `204`?
- [ ] O aluno conseguiu testar todas as rotas com sucesso usando uma ferramenta como o Postman?

## Solução Completa do Laboratório

O código final no arquivo `Aula03/src/server.js` deve ser semelhante a este:

```javascript
const express = require("express");
const app = express();
const port = 3000;

// Middleware para o Express entender JSON no corpo das requisições
app.use(express.json());

// Um array para simular nosso "banco de dados" em memória
let tarefas = [
  { id: 1, descricao: "Estudar Node.js", concluida: true },
  { id: 2, descricao: "Criar API com Express", concluida: false },
];

// Rota principal
app.get("/", (req, res) => {
  res.send("Bem-vindo à API de Tarefas!");
});

// GET /tarefas - Retorna todas as tarefas
app.get("/tarefas", (req, res) => {
  res.json(tarefas);
});

// POST /tarefas - Cria uma nova tarefa
app.post("/tarefas", (req, res) => {
  const novaTarefa = {
    id: tarefas.length > 0 ? Math.max(...tarefas.map((t) => t.id)) + 1 : 1, // Geração de ID mais robusta
    descricao: req.body.descricao,
    concluida: req.body.concluida || false,
  };

  if (!novaTarefa.descricao) {
    return res.status(400).json({ erro: "A descrição é obrigatória" });
  }

  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

// PUT /tarefas/:id - Atualiza uma tarefa existente
app.put("/tarefas/:id", (req, res) => {
  const idTarefa = parseInt(req.params.id);
  const tarefa = tarefas.find((t) => t.id === idTarefa);

  if (!tarefa) {
    return res.status(404).json({ erro: "Tarefa não encontrada" });
  }

  tarefa.descricao = req.body.descricao || tarefa.descricao;
  // Permite atualizar 'concluida' para 'false'
  if (req.body.concluida !== undefined) {
    tarefa.concluida = req.body.concluida;
  }

  res.json(tarefa);
});

// DELETE /tarefas/:id - Deleta uma tarefa
app.delete("/tarefas/:id", (req, res) => {
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

- **Esquecer `app.use(express.json())`**: Isso faz com que `req.body` seja `undefined` nas rotas `POST` e `PUT`, causando erros.
- **Conversão de ID**: O `req.params.id` vem como uma string. É importante convertê-lo para um número (`parseInt`) antes de comparar com os IDs no array, que são números.
- **Lógica de Atualização (PUT)**: Alunos podem ter dificuldade em como atualizar apenas os campos enviados. A lógica `req.body.descricao || tarefa.descricao` é um atalho comum para isso.
- **Status Codes**: Podem esquecer de retornar os status codes corretos (`201`, `204`, `404`), retornando sempre o padrão `200`.
- **Geração de ID**: A lógica `tarefas.length + 1` é simples, mas falha se itens forem deletados. A solução no gabarito (`Math.max(...) + 1`) é um pouco mais robusta para um cenário em memória.
