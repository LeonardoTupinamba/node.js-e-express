const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API de Tarefas",
    version: "1.0.0",
    description: "Uma API simples para gerenciar tarefas.",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor de desenvolvimento",
    },
  ],
};

const options = {
  swaggerDefinition,
  // Caminho para os arquivos que contêm as anotações do Swagger
  apis: ["./src/server.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
