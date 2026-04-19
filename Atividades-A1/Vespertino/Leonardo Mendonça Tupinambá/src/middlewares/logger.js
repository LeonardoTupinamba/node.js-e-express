// src/middlewares/logger.js
// Middleware de logging com status codes coloridos usando o pacote 'colors'

const colors = require("colors");

// Mapeia status codes para cores
function colorirStatus(status) {
  if (status >= 500) return colors.red.bold(status);
  if (status >= 400) return colors.yellow.bold(status);
  if (status >= 300) return colors.cyan.bold(status);
  if (status >= 200) return colors.green.bold(status);
  return colors.white(status);
}

function logger(req, res, next) {
  const inicio = Date.now();

  // Intercepta o método res.json para capturar o status code na resposta
  const originalJson = res.json.bind(res);
  const originalSend = res.send.bind(res);

  function logFinal(status) {
    const duracao = Date.now() - inicio;
    const metodo = colors.bold(req.method);
    const url = colors.white(req.url);
    const statusColorido = colorirStatus(status);
    const tempo = colors.gray(`${duracao}ms`);
    const hora = colors.gray(new Date().toISOString());

    console.log(`[${hora}] ${metodo} ${url} → ${statusColorido} (${tempo})`);
  }

  res.json = function (body) {
    logFinal(res.statusCode);
    return originalJson(body);
  };

  res.send = function (body) {
    logFinal(res.statusCode);
    return originalSend(body);
  };

  next();
}

module.exports = logger;
