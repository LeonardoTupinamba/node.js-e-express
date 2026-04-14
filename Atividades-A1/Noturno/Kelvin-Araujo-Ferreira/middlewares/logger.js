const colors = require('colors/safe');

module.exports = (req, res, next) => {
  // Intercepta resposta para pegar o status depois.
  const oldSend = res.send;
  res.send = function (data) {
    const status = res.statusCode;
    let logMsg = `${req.method} ${req.originalUrl} -> status: ${status}`;
    if (status >= 200 && status < 300) logMsg = colors.green(logMsg);
    else if (status >= 400) logMsg = colors.red(logMsg);
    else logMsg = colors.yellow(logMsg);
    console.log(logMsg);
    oldSend.apply(res, arguments);
  };
  next();
};