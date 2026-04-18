# Atividade A1 — Felipe da Silva Spinola

Projeto desenvolvido em Node.js com Express para gerenciamento simples de alunos em memória.

## Visão geral

Esta API permite listar, consultar, criar, atualizar e remover alunos usando uma estrutura leve e direta, mantendo o foco na atividade.

## Como executar

```bash
npm install
npm start
```

Se preferir, também é possível iniciar com:

```bash
node index.js
```

## Rotas disponíveis

- `GET /` — mensagem de boas-vindas da API
- `GET /alunos` — lista todos os alunos
- `GET /alunos/:id` — consulta um aluno pelo `id`
- `POST /alunos` — cria um novo aluno
- `PUT /alunos/:id` — atualiza um aluno existente
- `DELETE /alunos/:id` — remove um aluno

## Autenticação

As rotas de escrita exigem autenticação Basic Auth:

- `POST /alunos`
- `PUT /alunos/:id`
- `DELETE /alunos/:id`

Credenciais:

- Usuário: `admin`
- Senha: `123456`

Exemplo de cabeçalho:

```txt
Authorization: Basic YWRtaW46MTIzNDU2
```

## Comportamento

- Os dados são armazenados apenas em memória.
- O servidor exibe logs coloridos com método, rota, status e tempo de resposta.
- Ao reiniciar a aplicação, os dados retornam ao estado inicial.
