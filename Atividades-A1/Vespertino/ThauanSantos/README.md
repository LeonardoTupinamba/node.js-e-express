# Atividade 01 - API de Gerenciamento de Alunos

Uma API REST simples desenvolvida em Node.js com Express.js para gerenciar registros de alunos.

## 📋 Descrição

Esta aplicação fornece endpoints para listar e adicionar alunos em um sistema de gerenciamento. A API utiliza um array em memória para armazenar os dados dos alunos.

## 📁 Estrutura do Projeto

```
atividade 01/
├── app.js                    # Arquivo principal da aplicação
├── package.json              # Dependências e configuração do projeto
├── src/
│   ├── README.md            # Documentação adicional
│   ├── modules/
│   │   └── alunosModule.js  # Lógica de negócio para alunos
│   └── routes/
│       └── alunosRoutes.js  # Definição das rotas da API
```

## 🚀 Requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## 📦 Instalação

1. Clone ou baixe o projeto
2. Navegue até a pasta do projeto:
   ```bash
   cd "atividade 01"
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```

## ▶️ Como Executar

Inicie o servidor com:
```bash
node app.js
```

O servidor iniciará na porta **3000** e exibirá a mensagem:
```
Servidor rodando na porta 3000
```

## 📡 Endpoints da API

### GET `/alunos`
Retorna a lista de todos os alunos cadastrados.

**Exemplo de requisição:**
```bash
curl http://localhost:3000/alunos
```

**Resposta (exemplo):**
```json
[
  {
    "id": 1,
    "nome": "João Silva"
  },
  {
    "id": 2,
    "nome": "Maria Santos"
  }
]
```

### POST `/alunos`
Adiciona um novo aluno à lista.

**Exemplo de requisição:**
```bash
curl -X POST http://localhost:3000/alunos \
  -H "Content-Type: application/json" \
  -d '{"nome": "Pedro Oliveira"}'
```

**Resposta (201 Created):**
```json
{
  "nome": "Pedro Oliveira"
}
```

**Erro (400 Bad Request)** - quando o nome não é fornecido:
```json
{
  "erro": "Nome obrigatorio"
}
```

## Tecnologias Utilizadas

- **Express.js** - Framework web para Node.js
- **Node.js** - Ambiente de execução JavaScript

## Notas

- Os dados são armazenados em memória e serão perdidos quando o servidor for reiniciado
- Para uma aplicação em produção, considere usar um banco de dados (MongoDB, PostgreSQL, etc.)
