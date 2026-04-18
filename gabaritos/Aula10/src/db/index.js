// src/db/index.js
const { Pool } = require("pg");
require("dotenv").config();

const isTest = process.env.NODE_ENV === "test";

// Configuração para o banco de dados de produção/desenvolvimento
const connectionConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

// Configuração para o banco de dados de teste
const testConnectionConfig = {
  user: process.env.TEST_DB_USER,
  host: process.env.TEST_DB_HOST,
  database: process.env.TEST_DB_DATABASE,
  password: process.env.TEST_DB_PASSWORD,
  port: process.env.TEST_DB_PORT,
};

const pool = new Pool(isTest ? testConnectionConfig : connectionConfig);

module.exports = pool;
