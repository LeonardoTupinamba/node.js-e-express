// Chave de API "secreta"
const API_KEY = "minha-chave-secreta-123";

/**
 * Middleware de autenticação simples.
 * Verifica se a chave de API está presente no cabeçalho 'x-api-key'.
 */
function authMiddleware(req, res, next) {
  const providedApiKey = req.headers["x-api-key"];

  if (!providedApiKey || providedApiKey !== API_KEY) {
    return res
      .status(401)
      .json({ message: "Chave de API inválida ou não fornecida." });
  }

  // Se a chave for válida, continua para a próxima rota
  next();
}

module.exports = authMiddleware;
