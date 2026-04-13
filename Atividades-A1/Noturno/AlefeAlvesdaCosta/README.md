# API de Gerenciamento de Produtos 📦

Esta é uma API funcional desenvolvida em Node.js para o gerenciamento básico de produtos, criada como parte da Atividade A1. A aplicação permite listar, buscar, cadastrar, atualizar e deletar produtos, aplicando conceitos de módulos personalizados, middlewares e autenticação por cabeçalho.

## 🚀 Tecnologias Utilizadas

* **Node.js**: Ambiente de execução.
* **Express**: Framework para construção das rotas.
* **Colors**: Biblioteca para estilização de logs no console.
* **Módulo Próprio**: Desenvolvido para cálculos de estoque.

## 🛠️ Requisitos da Atividade Atendidos

Conforme solicitado na proposta da atividade:
1.  **Módulo Próprio**: Criação e importação de um módulo específico para calcular o Valor Total em Estoque (`quantidade * valor_unitario`).
2.  **Biblioteca Colors**: Implementação de cores no console para diferenciar e identificar visualmente cada requisição feita à API.
3.  **Middlewares de Log**: Registro de atividades de acesso à API.
4.  **Middleware de Autenticação**: Proteção de rotas sensíveis via headers utilizando um `token-auth`.

## 📌 Endpoints da API

### Públicos (Acesso Livre)
* `GET /` : Endpoint de boas-vindas.
* `GET /produtos` : Lista todos os produtos cadastrados.
* `GET /produtos/:id` : Busca um produto específico pelo ID. 
    * *Diferencial:* Retorna o **valor total em estoque** deste item (calculado via módulo próprio).

### Privados (Requer Token)
> **Nota:** Para os endpoints abaixo, é obrigatório enviar no cabeçalho (Headers) da requisição:  
> `auth: 999`

* `POST /produtos` : Cadastra um novo produto.
    * **Obrigatório:** `nome`, `valor`, `qtde`.
    * **Opcional:** `descricao`.
* `PUT /produtos/:id` : Atualiza as informações de um produto existente.
* `DELETE /produtos/:id` : Remove um produto do sistema.

## 🔧 Como Executar o Projeto

Para rodar a API localmente em sua máquina, siga os passos abaixo:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/oMaestro174/node.js-e-express.git
   ```
2. **Acesse a pasta do projeto:**

```bash
cd Atividades-A1/Noturno/AlefeAlvesdaCosta/src
```
3. **Instale as dependências:**
```bash
npm install
```
4. **Inicie o servidor:**

```bash
node server.js
```

O servidor será iniciado e você poderá realizar as requisições via ferramentas como Postman, Insomnia ou Thunder Client.

## 🧪 Teste realizados
Os teste realizados podem ser vistos acessando a pasta localizada em: 
Atividades-A1/Noturno/AlefeAlvesdaCosta/testes

Desenvolvido por Alefe Alves da Costa.