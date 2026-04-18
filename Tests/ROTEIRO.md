# Guia de Estudo: A Evolução da Nossa API de Tarefas

Olá, pessoal! Este guia foi criado para ajudar vocês a navegarem pelas diferentes etapas do nosso projeto de API. Usem este roteiro para entender como saímos de uma API simples e chegamos a uma versão profissional e bem documentada.

---

### **Parte 1: O Início - Revendo a API da Aula 08**

Vamos começar revisitando o código que fizemos na Aula 08.

- **Onde encontrar o código?**
  - Navegue até a pasta `Tests/Aula08/src`.

- **O que observar?**
  1.  **API Insegura:** Lembre-se que, no início, qualquer um podia acessar, criar e deletar tarefas. Nossos endpoints em `tasksRoutes.js` não tinham nenhuma proteção.
  2.  **Introduzindo a Segurança:** Veja como criamos o arquivo `authMiddleware.js`. A "mágica" acontece quando aplicamos esse middleware às rotas de tarefas. Isso nos permitiu proteger nossos dados, garantindo que apenas usuários logados pudessem acessar suas próprias tarefas.
  3.  **Conclusão da Etapa:** Neste ponto, tínhamos uma API segura e funcional. Mas será que a estrutura do código era a melhor? E como outra pessoa saberia usar nossa API?

---

### **Parte 2: Organização Profissional - A Estrutura da Aula 09**

Uma API não é feita apenas de código que funciona, mas também de código organizado. Na Aula 09, demos um grande passo para uma estrutura mais profissional, inspirada no padrão MVC (Model-View-Controller).

- **Onde encontrar o código?**
  - Explore a pasta `gabaritos/Aula09`.

- **O que observar?**
  1.  **Nova Estrutura de Pastas:** Compare esta estrutura com a da Aula 08. Note a separação clara de responsabilidades:
      - `server.js`: Agora, ele é apenas o ponto de partida da aplicação.
      - `src/routes/`: Define todos os "caminhos" (endpoints) da nossa API.
      - `src/controllers/`: Contém a "lógica de negócio". É aqui que o trabalho pesado acontece (criar usuário, buscar tarefa, etc.).
      - `src/middlewares/`: Funções que agem como "seguranças" ou "ajudantes" no meio do caminho de uma requisição.
  2.  **O Problema da "Caixa Preta":** A API está muito bem organizada, mas ainda temos um problema: se um novo desenvolvedor entrasse no time, como ele saberia quais rotas existem? O que precisa ser enviado para a rota `/login`? A API ainda é uma "caixa preta".

---

### **Parte 3: O Toque Final - Documentando a API com Swagger**

Chegamos à versão final do nosso laboratório, onde resolvemos o problema da "caixa preta" adicionando uma documentação interativa com Swagger.

- **Onde encontrar o código?**
  - A versão final e documentada está em `Tests/Aula09`.

- **O que observar?**
  1.  **Novas Ferramentas:** No `package.json`, você verá duas novas dependências: `swagger-ui-express` e `swagger-jsdoc`. Elas são as responsáveis por gerar nossa documentação.
  2.  **Comentários Mágicos:** Abra qualquer arquivo em `src/routes/`. Você verá blocos de comentários `/** ... */` antes de cada rota. Não são comentários comuns! Eles seguem um padrão que o Swagger usa para entender e descrever cada detalhe da sua API.
  3.  **A Rota da Documentação:** No `server.js`, veja a linha `app.use('/api-docs', ...)` . É essa linha que "publica" nossa documentação em uma página web.

- **Experimente você mesmo! (A Parte Divertida)**
  1.  Navegue até a pasta `Tests/Aula09` no terminal e inicie o servidor (`npm run dev`).
  2.  Abra seu navegador e acesse **http://localhost:3000/api-docs**.
  3.  Explore a documentação! Tente o seguinte:
      - Use a rota `POST /auth/register` para criar um novo usuário.
      - Use a rota `POST /auth/login` com os dados que você acabou de criar para receber um token de acesso.
      - No topo direito da página, clique no botão **"Authorize"**. Na janela que abrir, cole **apenas o token** que você recebeu (sem a palavra "Bearer"). A interface do Swagger cuidará de adicionar o prefixo para você.
        - Exemplo do que colar: `eyJhbGciOiJIUzI1Ni...`
      - **Nota sobre o Postman:** Se você for testar em uma ferramenta como o Postman, o processo é um pouco diferente. Vá até a aba "Authorization", selecione o tipo "Bearer Token" e cole o seu token no campo à direita. O Postman adicionará o prefixo "Bearer " automaticamente ao cabeçalho da requisição.
      - Agora que você está "logado" na documentação, tente usar a rota `POST /tasks` para criar uma nova tarefa. Funcionou!

---

**Parabéns!** Você acompanhou toda a jornada de construção de uma API, desde o básico até uma versão segura, bem estruturada e com uma documentação de nível profissional. O próximo passo em um projeto real seria criar testes automatizados para garantir que tudo continue funcionando perfeitamente.
