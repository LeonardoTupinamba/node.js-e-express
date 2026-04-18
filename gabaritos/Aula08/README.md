# Gabarito - Aula 08: Documentação de APIs com Swagger

Este gabarito apresenta a solução para o exercício da Aula 08, que consiste em adicionar documentação a uma API Express utilizando Swagger e protegendo a rota de documentação com autenticação básica.

## Estrutura do Projeto

- `server.js`: Arquivo principal que contém o servidor Express, a lógica da API, a configuração do Swagger e a implementação da autenticação básica.

## Conceitos Aplicados

### 1. **Swagger e OpenAPI**

- **`swagger-jsdoc`**: Utilizado para ler comentários JSDoc no código e gerar a especificação OpenAPI (em formato JSON). Isso permite que a documentação seja escrita junto ao código dos endpoints, facilitando a manutenção.
- **`swagger-ui-express`**: Utilizado para servir uma interface de usuário (UI) interativa e amigável para a especificação OpenAPI gerada.

### 2. **Comentários JSDoc para Documentação**

A documentação de cada endpoint é definida em blocos de comentários JSDoc seguindo a sintaxe do OpenAPI.

- **Definição da API**: Um comentário geral define as informações principais da API (título, versão, descrição).
- **Definição de Componentes/Schemas**: O schema `Produto` é definido para ser reutilizado na documentação dos endpoints, evitando repetição.
- **Documentação de Rota (Endpoint)**:
  - `tags`: Agrupa endpoints relacionados.
  - `summary`: Uma breve descrição do que o endpoint faz.
  - `description`: Uma descrição mais detalhada.
  - `parameters`: Descreve os parâmetros da rota (ex: `/:id`).
  - `requestBody`: Descreve o corpo da requisição (para `POST` e `PUT`).
  - `responses`: Descreve as possíveis respostas HTTP (200, 201, 404, etc.), incluindo o schema do conteúdo retornado.

### 3. **Autenticação Básica (`express-basic-auth`)**

Para proteger a rota da documentação (`/api-docs`), foi utilizada a biblioteca `express-basic-auth`.

- **Mecanismo**: A autenticação básica (Basic Auth) é um esquema de autenticação HTTP simples. O cliente envia as credenciais (usuário e senha) codificadas em Base64 no cabeçalho `Authorization`.
- **Implementação**:
  1. A biblioteca é adicionada como um middleware na rota `/api-docs`.
  2. As credenciais válidas são definidas no objeto `users`. Neste exemplo, foram fixadas no código, mas em um cenário real, deveriam vir de variáveis de ambiente.
  3. `challenge: true`: Esta opção faz com que o navegador exiba um pop-up de login caso as credenciais não sejam fornecidas ou sejam inválidas.

## Como Executar

1. **Instale as dependências**:

   ```bash
   npm install express swagger-jsdoc swagger-ui-express express-basic-auth
   ```

2. **Inicie o servidor**:

   ```bash
   node server.js
   ```

3. **Acesse a documentação**:
   - Abra o navegador e acesse `http://localhost:3000/api-docs`.
   - Um pop-up de login será exibido.
   - Insira o usuário `admin` e a senha `supersecret`.
   - Após a autenticação, a interface do Swagger será carregada, permitindo explorar e testar a API.

## Código-Fonte (`server.js`)

O arquivo `server.js` contém a implementação completa, combinando o código da API da aula anterior com as novas funcionalidades de documentação e segurança.
