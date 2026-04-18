# 📚 API de Alunos

API REST simples para gerenciamento de alunos, desenvolvida com **Node.js** e **Express**.  
Os dados são mantidos **em memória** durante a execução do servidor.

---

## 🗂️ Estrutura de Pastas

```
api-alunos/
├── server.js                          # Ponto de entrada — inicializa o servidor
├── package.json
├── README.md
├── src/
│   ├── app.js                         # Configuração do Express e registro de rotas
│   ├── modules/
│   │   └── alunos.module.js           # Módulo próprio com lógica de negócio
│   └── routes/
│       └── alunos.routes.js           # Definição das rotas GET e POST
└── tests/
    └── api-alunos.postman_collection.json  # Coleção de testes para Postman/Insomnia
```

---

## ⚙️ Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- npm (já incluso com o Node.js)

---

## 🚀 Instalação e Execução

### 1. Clone o repositório (ou extraia os arquivos)

```bash
git clone <url-do-repositorio>
cd api-alunos
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicie o servidor

```bash
npm start
```

Ou com **hot-reload** (Node.js v18+):

```bash
npm run dev
```

O servidor iniciará em: `http://localhost:3000`

---

## 📡 Rotas Disponíveis

### `GET /alunos` — Listar todos os alunos

**Resposta:** `200 OK`

```json
{
  "total": 2,
  "alunos": [
    {
      "id": 1,
      "nome": "Maria Silva",
      "idade": 22,
      "curso": "Engenharia de Software",
      "criadoEm": "2024-01-15T10:30:00.000Z"
    },
    {
      "id": 2,
      "nome": "João Costa",
      "idade": 25,
      "curso": "Ciência da Computação",
      "criadoEm": "2024-01-15T10:31:00.000Z"
    }
  ]
}
```

---

### `POST /alunos` — Cadastrar um novo aluno

**Body (JSON):**

```json
{
  "nome": "Maria Silva",
  "idade": 22,
  "curso": "Engenharia de Software"
}
```

| Campo  | Tipo   | Obrigatório | Descrição              |
|--------|--------|-------------|------------------------|
| nome   | string | ✅ Sim      | Nome completo do aluno |
| idade  | number | ✅ Sim      | Idade (número positivo)|
| curso  | string | ✅ Sim      | Curso matriculado      |

**Resposta de sucesso:** `201 Created`

```json
{
  "mensagem": "Aluno cadastrado com sucesso!",
  "aluno": {
    "id": 1,
    "nome": "Maria Silva",
    "idade": 22,
    "curso": "Engenharia de Software",
    "criadoEm": "2024-01-15T10:30:00.000Z"
  }
}
```

**Resposta de erro (dados inválidos):** `400 Bad Request`

```json
{
  "mensagem": "Dados inválidos.",
  "erros": [
    "O campo \"nome\" é obrigatório e deve ser uma string não vazia.",
    "O campo \"curso\" é obrigatório e deve ser uma string não vazia."
  ]
}
```

---

## 🧪 Testes Manuais com Postman ou Insomnia

A coleção de testes está em `tests/api-alunos.postman_collection.json`.

### Como importar no Postman

1. Abra o Postman
2. Clique em **Import**
3. Selecione o arquivo `tests/api-alunos.postman_collection.json`
4. Execute os testes na ordem

### Como importar no Insomnia

1. Abra o Insomnia
2. Vá em **File → Import**
3. Selecione o arquivo JSON da coleção

---

### Testes Manuais Documentados

#### ✅ Teste 1 — GET /alunos (lista inicial)

| Campo     | Valor                          |
|-----------|--------------------------------|
| Método    | GET                            |
| URL       | `http://localhost:3000/alunos` |
| Body      | —                              |
| Esperado  | `200 OK` com `"total": 0`      |

**Screenshot esperado:**
```
Status: 200 OK
Body: { "total": 0, "alunos": [] }
```

---

#### ✅ Teste 2 — POST /alunos (criar aluno válido)

| Campo     | Valor                          |
|-----------|--------------------------------|
| Método    | POST                           |
| URL       | `http://localhost:3000/alunos` |
| Header    | `Content-Type: application/json` |
| Body      | `{ "nome": "Maria Silva", "idade": 22, "curso": "Engenharia de Software" }` |
| Esperado  | `201 Created` com dados do aluno |

**Screenshot esperado:**
```
Status: 201 Created
Body: { "mensagem": "Aluno cadastrado com sucesso!", "aluno": { "id": 1, ... } }
```

---

#### ✅ Teste 3 — POST /alunos (dados inválidos)

| Campo     | Valor                          |
|-----------|--------------------------------|
| Método    | POST                           |
| URL       | `http://localhost:3000/alunos` |
| Header    | `Content-Type: application/json` |
| Body      | `{ "nome": "", "idade": -5 }`  |
| Esperado  | `400 Bad Request` com erros    |

---

## 🧩 Módulos da Aplicação

| Arquivo                      | Responsabilidade                                      |
|------------------------------|-------------------------------------------------------|
| `server.js`                  | Inicializa o servidor na porta 3000                   |
| `src/app.js`                 | Configura o Express, middlewares e rotas              |
| `src/modules/alunos.module.js` | Lógica de negócio: listar, adicionar e validar alunos |
| `src/routes/alunos.routes.js`  | Define os endpoints GET e POST de `/alunos`           |

---

## 📝 Observações

- Os dados são **voláteis**: ao reiniciar o servidor, a lista de alunos é zerada.
- A API usa `express.json()` para interpretar corpos de requisição em formato JSON.
- O módulo `alunos.module.js` é totalmente independente do Express, facilitando manutenção e testes futuros.
