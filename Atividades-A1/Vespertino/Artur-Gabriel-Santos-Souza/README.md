# API de Alunos
Este projeto é uma API simples para aprender a usar rotas, módulos e JSON.

# Como instalar e rodar
No terminal, dentro da pasta do projeto, instale o express:
   ``npm install express``

# Bash
 ``node app.js``
 Rotas criadas
<GET /produtos: Mostra todos os produtos que estão salvos (Status 200).

<POST /produtos: Recebe um JSON para cadastrar um novo produto (Status 201).

## Testes realizados
Usei o Postman para testar as rotas:

<GET:

 Chamei a URL: http://localhost:3000/produtos
 Resultado: Listou os produtos corretamente com Status 200.

<POST:

 Enviei um JSON no Body da requisição.
 Resultado: Recebi a confirmação de produto cadastrado com Status 201.
 