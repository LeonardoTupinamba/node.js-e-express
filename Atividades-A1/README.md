# Atividades A1 — Avaliação Inicial

## Orientações gerais

Esta atividade vale como **A1** e deve ser desenvolvida com base no conteúdo estudado até a **Aula 4**. O aluno deve escolher apenas um nível de desafio, de acordo com sua segurança e domínio dos assuntos vistos em sala.

A entrega deve ser organizada dentro da pasta `Atividades-A1`, com uma subpasta contendo o nome do aluno. O envio final deve ser feito em uma branch com o nome do aluno, após commit e push para o repositório da turma.

## O que revisar

Antes de começar, é recomendado revisar:

- **Aula 1:** Node.js, runtime, Event Loop, instalação e módulos.
- **Aula 2:** NPM, `package.json`, scripts e organização do projeto.
- **Aula 3:** Express, rotas, métodos HTTP e estrutura inicial de API.
- **Aula 4:** middlewares, `express.json()`, logging e fluxo de execução no Express.

## Regras de entrega

- Criar a pasta `Atividades-A1`.
- Criar dentro dela uma pasta com o nome completo do aluno.
- Fazer a atividade em uma branch com o nome do aluno.
- Manter o projeto organizado em pastas e arquivos coerentes com o que foi visto em aula.
- Entregar o código com `README.md` e instruções de execução.

## Como clonar e enviar

### Clonar o repositório

```bash
git clone https://github.com/SEU-USUARIO/REPOSITORIO-DA-TURMA.git
cd REPOSITORIO-DA-TURMA
```

### Criar a branch

```bash
git checkout -b nome-do-aluno
```

### Criar a pasta da atividade

```bash
mkdir -p Atividades-A1/Nome-do-Aluno
```

### Commitar e enviar

```bash
git add .
git commit -m "A1: atividade do nome do aluno"
git push origin nome-do-aluno
```

## Nível 1 — Básico

### Objetivo

Construir uma API simples para treinar módulos, rotas e envio de JSON. Esse nível é indicado para quem ainda está consolidando os fundamentos.

### Atividade

Criar uma API de **alunos** ou **produtos** com os seguintes requisitos:

- Usar pelo menos **um módulo próprio** para separar uma função da aplicação.
- Criar `GET /alunos` ou `GET /produtos` para listar registros.
- Criar `POST /alunos` ou `POST /produtos` para adicionar registros em memória.
- Habilitar `express.json()` para receber corpo em JSON.
- Retornar `200` na listagem e `201` na criação.

### O que entregar

- Código-fonte organizado.
- `README.md` com instruções de execução.
- Estrutura mínima de pastas bem definida.
- Pelo menos dois testes manuais feitos com Postman ou Insomnia.

### O que será observado

- Uso correto de módulos.
- Funcionamento das rotas.
- Organização da aplicação.
- Clareza do código.

### Para te ajudar: aulas para rever

Para realizar esta atividade, os seguintes materiais serão muito úteis:

- **[Aula 01 - Introdução ao Node.js](../Aula01/README.md)**: Para relembrar como executar scripts Node.js.
- **[Aula 02 - Módulos e NPM](../Aula02/README.md)**: Essencial para aprender a criar e exportar funções em um módulo e importá-las em outro.
- **[Aula 03 - Express: Servidores e Rotas](../Aula03/README.md)**: Para criar o servidor e as rotas `GET` e `POST`.
- **[Aula 04 - Middlewares no Express](../Aula04/README.md)**: Para entender o `express.json()`.

## Nível 2 — Intermediário

### Objetivo

Expandir a API simples com mais rotas e introduzir middleware de exemplo. Esse nível avalia o uso do Express com mais controle do fluxo da requisição.

### Atividade

Criar uma API de **alunos** ou **produtos** com os seguintes requisitos:

- Tudo do nível básico.
- Criar também `PUT /alunos/:id` ou `PUT /produtos/:id` para atualizar um registro.
- Criar também `DELETE /alunos/:id` ou `DELETE /produtos/:id` para remover um registro.
- Implementar um middleware de exemplo apenas com `console.log()` para mostrar que a requisição passou por ele.
- Manter os dados em memória.

### O que entregar

- Código-fonte organizado em pastas.
- `README.md` com execução e explicação do fluxo.
- Evidências dos testes realizados.
- Estrutura do projeto coerente com o que foi visto sobre organização.

### O que será observado

- Rotas `GET`, `POST`, `PUT` e `DELETE` funcionando.
- Middleware executando corretamente.
- Organização do código.
- Uso coerente dos status codes.

### Para te ajudar: aulas para rever

Para realizar esta atividade, os seguintes materiais serão muito úteis:

- **[Aula 03 - Express: Servidores e Rotas](../Aula03/README.md)**: Cobre tudo sobre a criação de rotas com diferentes métodos HTTP (`GET`, `POST`, `PUT`, `DELETE`).
- **[Aula 04 - Middlewares no Express](../Aula04/README.md)**: Fundamental para entender como criar um middleware de `console.log` e o papel da função `next()`.

## Nível 3 — Avançado

### Objetivo

Montar uma API mais completa, com parâmetros, filtro por id, logging mais elaborado e melhor organização da aplicação. Esse nível exige maior domínio dos conteúdos vistos até a Aula 4.

### Atividade

Criar uma API de **alunos** ou **produtos** com os seguintes requisitos:

- Tudo do nível intermediário.
- Criar rota com **filtro por id** usando parâmetro de rota, como `GET /alunos/:id` ou `GET /produtos/:id`.
- Trabalhar passagem de parâmetros por rota e exibir o valor recebido.
- Implementar logging destacando os status codes por cores usando o pacote ou módulo `colors`.
- Manter a aplicação organizada em pastas separadas, conforme a capacidade do aluno.

### O que entregar

- Código-fonte completo e organizado.
- `README.md` com explicação dos endpoints e de como executar o projeto.
- Evidências de testes com sucesso e erro.
- Estrutura de pastas clara e coerente com boas práticas.

### O que será observado

- Uso correto de parâmetros de rota.
- Filtro por id funcionando.
- Logger colorido com status codes.
- Organização do projeto e clareza na estrutura.

### Para te ajudar: aulas para rever

Para realizar esta atividade, os seguintes materiais serão muito úteis:

- **[Aula 03 - Express: Servidores e Rotas](../Aula03/README.md)**: Essencial para aprender a ler parâmetros de rota (`req.params`) para o filtro por ID.
- **[Aula 04 - Middlewares no Express](../Aula04/README.md)**: Para aprofundar a criação de middlewares, como o de logging.

## Nível Jedi — Extra desafio

### Objetivo

Desenvolver a versão mais completa da atividade, reunindo rotas, organização, parâmetros, logging avançado, autenticação básica e documentação da API. Esse nível é indicado para alunos que desejam encarar o máximo da proposta.

### Atividade

Criar uma API de **alunos** ou **produtos** com os seguintes requisitos:

- Tudo do nível avançado.
- Implementar **autenticação básica** em pelo menos uma rota sensível, usando um token fixo no header.
- Proteger pelo menos uma rota `POST`, `PUT` ou `DELETE` com middleware de autenticação.
- Retornar `401` quando o token não for enviado ou estiver incorreto.
- Documentar no `README.md` o que a API faz, quais rotas existem e como usar cada uma delas.

### O que entregar

- Código-fonte completo e organizado.
- `README.md` documentando a API, os endpoints, headers necessários e instruções de execução.
- Evidências de testes de sucesso e erro, inclusive da autenticação.
- Estrutura bem organizada, com separação de responsabilidades sempre que possível.

### O que será observado

- Funcionamento da autenticação básica.
- Clareza da documentação no `README.md`.
- Organização geral da API.
- Aplicação consistente de tudo que foi pedido no nível avançado.

### Para te ajudar: aulas para rever

Para este desafio, você combinará o conhecimento de várias aulas:

- **[Aula 03 - Express: Servidores e Rotas](../Aula03/README.md)**: Essencial para a criação de toda a estrutura da API e rotas.
- **[Aula 04 - Middlewares no Express](../Aula04/README.md)**: Fundamental para implementar o middleware de autenticação para proteger as rotas.

## Critérios gerais de avaliação

- Funcionamento da aplicação.
- Qualidade da organização do código.
- Uso dos conteúdos vistos até a Aula 4, com extensão opcional no Nível Jedi.
- Clareza do `README.md` e da estrutura de envio.
- Correção na criação da branch e da pasta do aluno.

## Observação final

O aluno deve escolher o nível compatível com o próprio momento de aprendizagem. O objetivo é avaliar de forma justa o que foi assimilado até a Aula 4 e, para quem quiser ir além, oferecer o Nível Jedi como desafio extra.