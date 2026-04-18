# Gabarito - Aula 07: Refatoração para API RESTful

Este gabarito contém a solução para a atividade avaliativa da Aula 07, onde uma API de "produtos" não-RESTful é refatorada para seguir as boas práticas da arquitetura REST.

## Pontos Chave da Refatoração

1.  **URIs baseadas em Recursos:** As URIs foram alteradas para focar no recurso (`/produtos`) em vez de ações.
    - `GET /listarProdutos` virou `GET /produtos`.
    - `POST /buscarProduto` virou `GET /produtos/:id`.
    - `GET /adicionarProduto` virou `POST /produtos`.
    - `GET /modificarProduto/:id` virou `PUT /produtos/:id`.
    - `POST /removerProduto` virou `DELETE /produtos/:id`.

2.  **Uso Correto dos Métodos HTTP:** Cada operação agora usa o verbo HTTP semanticamente correto.
    - **GET:** Para leitura/busca.
    - **POST:** Para criação.
    - **PUT:** Para atualização completa.
    - **DELETE:** Para remoção.

3.  **Códigos de Status Semânticos:** Os códigos de status foram ajustados para refletir o resultado real da operação.
    - `201 Created` para `POST`.
    - `204 No Content` para `DELETE`.
    - `404 Not Found` para quando um recurso específico não é encontrado.
    - `400 Bad Request` para dados inválidos enviados pelo cliente.

4.  **Transmissão de Dados Adequada:**
    - IDs de recursos específicos são passados via _path params_ (`/produtos/:id`).
    - Dados para criação e atualização são enviados no corpo (`body`) da requisição em formato JSON.
    - O uso de _query params_ foi removido onde não era apropriado.
