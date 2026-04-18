const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API de Tarefas - Aula 09",
    version: "1.0.0",
    description:
      "Esta é uma API completa para gerenciamento de tarefas com autenticação JWT, desenvolvida para a Aula 09.",
    contact: {
      name: "Professor",
      email: "professor@exemplo.com",
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor de Desenvolvimento",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  // Caminho para os arquivos que contêm as anotações da API
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
