API de Alunos — Nível 3 Avançado

API desenvolvida com Node.js e Express para gerenciamento de alunos.

Como executar

Pré-requisitos

- Node.js instalado
- NPM instalado

Instalação

```bash
# Clone ou copie o projeto para sua máquina
# Acesse a pasta do projeto
cd C:\Atividades-A1\Vespertino\Leonardo Mendonça Tupinambá

# Instale as dependências
npm install

# Rode o servidor
npm start

# Ou com hot-reload (nodemon)
npm run dev

O servidor estará disponível em: `http://localhost:3001`



📁 Estrutura de pastas


C:\Atividades-A1\Vespertino\Leonardo Mendonça Tupinambá/
├── src/
│ ├── data/
│ │ └── alunos.js # Dados em memória (simula banco de dados)
│ ├── middlewares/
│ │ └── logger.js # Middleware de logging colorido
│ ├── modules/
│ │ └── alunosHelper.js # Módulo próprio com funções auxiliares
│ ├── routes/
│ │ └── alunos.js # Rotas da API de alunos
│ └── server.js # Arquivo principal do servidor
├── package.json
└── README.md

```

---

Endpoints

`GET /`

Rota principal de boas-vindas.

Resposta:

Bem-vindo à API de Alunos!

---

### `GET /alunos`

Retorna todos os alunos cadastrados.

**Resposta `200`:**

```json
[
  { "id": 1, "nome": "Ana Silva", "curso": "Educação Física", "nota": 8.5 },
  {
    "id": 2,
    "nome": "Bruno Costa",
    "curso": "Análise e Desenvolvimento de Sistemas",
    "nota": 7.0
  }
]
```

---

### `GET /alunos/:id`

Retorna um aluno específico pelo ID.

**Parâmetro de rota:** `id` (número inteiro)

**Exemplo:** `GET /alunos/1`

**Resposta `200`:**

```json
{ "id": 1, "nome": "Ana Silva", "curso": "Educação Física", "nota": 8.5 }
```

**Resposta `404` (não encontrado):**

```json
{ "erro": "Aluno com id 99 não encontrado." }
```

---

### `POST /alunos`

Cria um novo aluno.

**Body (JSON):**

```json
{
  "nome": "Diego Alves",
  "curso": "Computação",
  "nota": 8.7
}
```

**Resposta `201`:**

```json
{ "id": 4, "nome": "Diego Alves", "curso": "Computação", "nota": 8.7 }
```

**Resposta `400` (campos obrigatórios ausentes):**

```json
{ "erro": "Os campos 'nome' e 'curso' são obrigatórios." }
```

---

### `PUT /alunos/:id`

Atualiza os dados de um aluno existente.

**Parâmetro de rota:** `id` (número inteiro)

**Body (JSON):**

```json
{
  "nota": 9.0
}
```

**Resposta `200`:**

```json
{ "id": 1, "nome": "Ana Silva", "curso": "Engenharia", "nota": 9.0 }
```

**Resposta `404`:**

```json
{ "erro": "Aluno com id 99 não encontrado." }
```

---

### `DELETE /alunos/:id`

Remove um aluno pelo ID.

**Parâmetro de rota:** `id` (número inteiro)

**Resposta `204`:** Sem conteúdo (sucesso)

**Resposta `404`:**

```json
{ "erro": "Aluno com id 99 não encontrado." }
```

---

Testes com Postman

Teste 1 — Listar todos os alunos (sucesso)

- **Método:** GET
- **URL:** `http://localhost:3001/alunos`
- **Resultado esperado:** Status 200 com lista de alunos

Teste 2 — Buscar aluno por ID (sucesso)

- **Método:** GET
- **URL:** `http://localhost:3001/alunos/1`
- **Resultado esperado:** Status 200 com dados do aluno

Teste 3 — Buscar aluno por ID (erro)

- **Método:** GET
- **URL:** `http://localhost:3001/alunos/99`
- **Resultado esperado:** Status 404 com mensagem de erro

Teste 4 — Criar novo aluno (sucesso)

- **Método:** POST
- **URL:** `http://localhost:3001/alunos`
- **Headers:** `Content-Type: application/json`
- **Body:**

```json
{ "nome": "Diego Alves", "curso": "Computação", "nota": 8.7 }
```

- **Resultado esperado:** Status 201 com aluno criado

Teste 5 — Criar aluno sem campos obrigatórios (erro)

- **Método:** POST
- **URL:** `http://localhost:3001/alunos`
- **Headers:** `Content-Type: application/json`
- **Body:**

```json
{ "nota": 7.0 }
```

- **Resultado esperado:** Status 400 com mensagem de erro

Teste 6 — Atualizar aluno (sucesso)

- **Método:** PUT
- **URL:** `http://localhost:3001/alunos/1`
- **Headers:** `Content-Type: application/json`
- **Body:**

```json
{ "nota": 10.0 }
```

- **Resultado esperado:** Status 200 com aluno atualizado

Teste 7 — Deletar aluno (sucesso)

- **Método:** DELETE
- **URL:** `http://localhost:3001/alunos/2`
- **Resultado esperado:** Status 204 sem conteúdo

---

Logger colorido

O middleware de logging exibe no terminal as requisições com cores por status code:

| Status | Cor         |
| ------ | ----------- |
| 2xx    | 🟢 Verde    |
| 3xx    | 🔵 Ciano    |
| 4xx    | 🟡 Amarelo  |
| 5xx    | 🔴 Vermelho |

**Exemplo no terminal:**

```
[2026-04-13T13:00:00.000Z] GET /alunos → 200 (3ms)
[2026-04-13T13:00:01.000Z] GET /alunos/99 → 404 (1ms)
[2026-04-13T13:00:02.000Z] POST /alunos → 201 (2ms)
```
