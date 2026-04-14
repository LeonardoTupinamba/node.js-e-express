# API de Alunos

API REST simples construída com Node.js e Express.

## Pré-requisitos

- Node.js v18+
- npm

## Instalação

```bash
npm install
```

## Execução

```bash
node server.js
```

O servidor sobe em http://localhost:3000

## Rotas

| Método | Rota    | Descrição              | Status |
| ------ | ------- | ---------------------- | ------ |
| GET    | /alunos | Lista todos os alunos  | 200    |
| POST   | /alunos | Adiciona um novo aluno | 201    |

## Exemplo de body para POST

```json
{
  "nome": "Carlos Mendes",
  "curso": "Ciência da Computação"
}
```

## Observações

- Os dados ficam armazenados em memória (resetam ao reiniciar o servidor).
