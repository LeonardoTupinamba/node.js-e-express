# Gabarito - Aula 06: Conectando a API ao PostgreSQL

Este gabarito contém a solução para a refatoração da API de tarefas, conectando-a a um banco de dados PostgreSQL.

## Estrutura

- `db.js`: Módulo responsável pela configuração do pool de conexão com o banco de dados.
- `server.js`: Arquivo principal da API, agora com a lógica de banco de dados integrada.

## Pontos Chave da Solução

1.  **Pool de Conexão (`db.js`):** Em vez de criar uma nova conexão para cada requisição, usamos um `Pool` do `pg` para gerenciar e reutilizar conexões, o que é muito mais eficiente.

2.  **Uso de `async/await`:** Todas as funções de rota que interagem com o banco de dados foram transformadas em `async` para lidar com a natureza assíncrona das queries.

3.  **Tratamento de Erros com `try...catch`:** Cada operação de banco de dados é envolvida em um bloco `try...catch`. Se a query falhar por qualquer motivo (ex: erro de sintaxe SQL, problema de conexão), o `catch` captura o erro e retorna uma resposta `500 Internal Server Error`, evitando que o servidor quebre.

4.  **Queries Parametrizadas:** Todas as queries que recebem dados do cliente (como `id`, `title`, etc.) usam queries parametrizadas (ex: `db.query('SELECT * FROM tasks WHERE id = $1', [id])`). Isso é **crucial** para prevenir ataques de **SQL Injection**.

5.  **Cláusula `RETURNING`:** Nos comandos `INSERT` e `UPDATE`, a cláusula `RETURNING *` é usada para que o PostgreSQL retorne os dados do registro que foi inserido ou atualizado. Isso nos permite enviar o objeto completo de volta para o cliente sem precisar fazer uma segunda query de `SELECT`.
