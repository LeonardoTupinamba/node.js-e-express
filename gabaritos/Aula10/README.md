# Gabarito - Aula 10: Testes de Integração com Jest e Supertest

Este gabarito fornece a solução completa para adicionar testes de integração ao projeto final, utilizando Jest e Supertest.

## Estrutura do Projeto

A estrutura do gabarito da Aula 09 foi modificada para suportar testes e separar a inicialização do servidor da definição do aplicativo Express.

```
gabaritos/Aula10/
├── __tests__/
│   ├── auth.test.js        # Testes para os endpoints de autenticação
│   └── tasks.test.js       # Testes para os endpoints de tarefas
├── src/
│   ├── controllers/
│   ├── db/
│   ├── middlewares/
│   └── routes/
├── .env
├── .gitignore
├── package.json
├── server.js               # Define o app Express e exporta-o
└── start.js                # Importa o app e inicia o servidor
```

## Principais Alterações e Conceitos

### 1. **Refatoração para Testabilidade (`server.js` e `start.js`)**

- **`server.js`**: Agora, este arquivo é responsável apenas por **configurar** a aplicação Express (middlewares, rotas, etc.) e, crucialmente, **exportar a instância do `app`**. Ele não inicia mais o servidor (não chama `app.listen`). Isso permite que os testes importem o `app` diretamente sem iniciar um servidor real na porta.
- **`start.js`**: Um novo arquivo cujo único propósito é importar o `app` de `server.js` e chamar `app.listen`. Este se torna o ponto de entrada da aplicação para execução normal (`npm start`).

### 2. **Configuração do Ambiente de Teste (`package.json`)**

- **Dependências de Desenvolvimento**: `jest` e `supertest` foram adicionados.
  ```bash
  npm install jest supertest --save-dev
  ```
- **Script de Teste**: Um script `"test"` foi adicionado para rodar o Jest.
  ```json
  "scripts": {
    "test": "NODE_ENV=test jest --runInBand"
  }
  ```

  - `NODE_ENV=test`: Define a variável de ambiente para que a aplicação saiba que está em modo de teste. Isso é útil para, por exemplo, conectar-se a um banco de dados de teste.
  - `--runInBand`: Força os testes a rodarem sequencialmente em um único processo. Isso é importante para testes de integração que dependem de um estado compartilhado (como um banco de dados) para evitar condições de corrida.

### 3. **Banco de Dados de Teste**

- A melhor prática é usar um banco de dados separado para os testes para não interferir com os dados de desenvolvimento.
- No arquivo `src/db/index.js`, a configuração da pool de conexão foi ajustada para ler variáveis de ambiente específicas para o teste.

  ```javascript
  // Exemplo de como poderia ser em src/db/index.js
  const isTest = process.env.NODE_ENV === "test";
  const pool = new Pool({
    user: isTest ? process.env.TEST_DB_USER : process.env.DB_USER,
    // ... outras credenciais
  });
  ```

- O arquivo `.env` foi atualizado para incluir as credenciais do banco de dados de teste.

### 4. **Escrevendo os Testes (`__tests__/`)**

- **`supertest`**: É usado para fazer requisições HTTP à nossa aplicação Express de dentro do código de teste, sem a necessidade de uma rede real. Ele se "conecta" diretamente ao `app` exportado.
- **`describe`, `it`, `expect`**: Estruturas padrão do Jest para organizar suítes de teste, casos de teste individuais e asserções.
- **`beforeAll`, `afterAll`**: Hooks do Jest para executar código antes ou depois de todos os testes em um arquivo. `beforeAll` é usado para fazer login e obter um token de autenticação que será reutilizado em todos os testes de rotas protegidas. `afterAll` é usado para fechar a conexão com o banco de dados.
- **Testes de Autenticação (`auth.test.js`)**:
  - Testa o registro de um novo usuário (garantindo que não seja possível registrar o mesmo usuário duas vezes).
  - Testa o login com credenciais válidas e inválidas.
- **Testes de Tarefas (`tasks.test.js`)**:
  - Testa a proteção das rotas (tentar acessar sem um token deve resultar em erro 401).
  - Testa o fluxo completo de CRUD (Criar, Ler, Atualizar, Deletar) para as tarefas, sempre enviando o token de autenticação.
  - Valida a **autorização**, garantindo que um usuário não possa acessar ou modificar as tarefas de outro usuário.

## Como Executar

1.  **Copie o Projeto**:
    - Copie o conteúdo de `gabaritos/Aula10` para uma nova pasta.

2.  **Setup do Banco de Dados**:
    - Crie **dois** bancos de dados no PostgreSQL: um para desenvolvimento e um para testes.
    - Execute o script SQL (disponível no `README.md` da Aula 09) em **ambos** os bancos para criar as tabelas.

3.  **Configure o `.env`**:
    - Crie o arquivo `.env` na raiz do projeto e preencha **todas** as variáveis, incluindo as do banco de dados de teste (`TEST_DB_*`).

4.  **Instale as Dependências**:

    ```bash
    npm install
    ```

5.  **Execute os Testes**:
    ```bash
    npm test
    ```

    - O Jest executará todos os arquivos em `__tests__/` e mostrará os resultados no console.
