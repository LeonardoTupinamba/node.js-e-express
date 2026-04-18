# Tutorial: Testando a API de Tarefas com Postman

Este tutorial mostra como testar todas as funcionalidades da nossa API de tarefas, incluindo a autenticação JWT, usando o Postman.

## Configuração Inicial

Antes de começar, certifique-se de que:

1.  O servidor da API está rodando (`node --watch server.js`).
2.  Você tem o Postman instalado.

---

## 1. Fazendo Login e Obtendo o Token

A primeira etapa é se autenticar para obter o `accessToken`.

- **Método:** `POST`
- **URL:** `http://localhost:3000/login`

- **Corpo da Requisição (Body):**
  1.  Vá para a aba **Body**.
  2.  Selecione a opção **raw**.
  3.  No menu dropdown que aparece à direita, selecione **JSON**.
  4.  Cole o seguinte JSON no campo de texto:

  ```json
  {
    "username": "testuser",
    "password": "qualquercoisa"
  }
  ```

- **Enviando a Requisição:**
  - Clique em **Send**.

- **Resposta Esperada:**
  - Você receberá um status `200 OK` e um corpo de resposta com o token:

  ```json
  {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaWQiOjEsImlhdCI6MTYxNzI4NjYwNSwiZXhwIjoxNjE3MjkwMjA1fQ.abcdef123456"
  }
  ```

- **Copie o `accessToken`** (apenas o valor longo, sem as aspas) para usar nos próximos passos.

---

## 2. Criando uma Nova Tarefa

Agora, vamos criar uma tarefa usando o token que obtivemos.

- **Método:** `POST`
- **URL:** `http://localhost:3000/tasks`

- **Cabeçalho de Autenticação (Headers):**
  1.  Vá para a aba **Headers**.
  2.  Na primeira linha vazia, em `Key`, digite `Authorization`.
  3.  Em `Value`, digite `Bearer ` (a palavra "Bearer" seguida de um espaço) e cole o seu `accessToken`.
      - _Exemplo:_ `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

- **Corpo da Requisição (Body):**
  1.  Vá para a aba **Body**, selecione **raw** e **JSON**.
  2.  Insira os detalhes da tarefa:

  ```json
  {
    "title": "Comprar pão",
    "description": "Ir na padaria da esquina"
  }
  ```

- **Enviando a Requisição:**
  - Clique em **Send**.

- **Resposta Esperada:**
  - Status `201 Created` e os dados da tarefa criada, incluindo o `id` e o `user_id`.

---

## 3. Listando Suas Tarefas

Vamos verificar se a tarefa foi criada.

- **Método:** `GET`
- **URL:** `http://localhost:3000/tasks`

- **Cabeçalho de Autenticação (Headers):**
  - Assim como no passo anterior, adicione o cabeçalho `Authorization` com o `Bearer Token`. O Postman geralmente mantém os cabeçalhos para a mesma aba.

- **Enviando a Requisição:**
  - Clique em **Send**.

- **Resposta Esperada:**
  - Status `200 OK` e uma lista (array) com todas as tarefas que você criou.

---

## 4. Atualizando uma Tarefa (Parcialmente com PATCH)

Vamos mudar o status da tarefa para "concluída".

- **Método:** `PATCH`
- **URL:** `http://localhost:3000/tasks/1` (substitua `1` pelo `id` da tarefa que você quer atualizar).

- **Cabeçalho de Autenticação (Headers):**
  - Adicione o `Authorization` com o `Bearer Token`.

- **Corpo da Requisição (Body):**
  1.  Vá para a aba **Body**, selecione **raw** e **JSON**.
  2.  Insira apenas o campo que deseja alterar:

  ```json
  {
    "status": "concluida"
  }
  ```

- **Enviando a Requisição:**
  - Clique em **Send**.

- **Resposta Esperada:**
  - Status `200 OK` e os dados completos da tarefa atualizada.

---

## 5. Deletando uma Tarefa

Por fim, vamos deletar a tarefa.

- **Método:** `DELETE`
- **URL:** `http://localhost:3000/tasks/1` (substitua `1` pelo `id` da tarefa).

- **Cabeçalho de Autenticação (Headers):**
  - Adicione o `Authorization` com o `Bearer Token`.

- **Enviando a Requisição:**
  - Clique em **Send**.

- **Resposta Esperada:**
  - Status `204 No Content`. A resposta não terá corpo (Body), o que é o comportamento esperado para uma deleção bem-sucedida.

---

### O que acontece se eu não enviar o token?

Se você tentar acessar qualquer rota de `/tasks` (GET, POST, PATCH, etc.) sem o cabeçalho `Authorization`, receberá um erro **`401 Unauthorized`**.

Se você enviar um token inválido ou expirado, receberá um erro **`403 Forbidden`**.
