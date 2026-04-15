/* registra método, URL e status das requisições com cores no terminal. */
const logger = (req, res, next) => {
  res.on('finish', () => {
    const status = res.statusCode;

    let color = '\x1b[32m'; // verde (sucesso)

    if (status >= 400 && status < 500) {
      color = '\x1b[31m'; // vermelho (erro cliente)
    } else if (status >= 500) {
      color = '\x1b[33m'; // amarelo (erro servidor)
    }

    console.log(`${color}${req.method} ${req.url} - ${status}\x1b[0m`);
  });

  next();
};
module.exports = logger;