require('colors')

function statusColors(statusCode) {
  const status = String(statusCode)

  if (statusCode >= 500) {
    return status.red
  }

  if (statusCode >= 400) {
    return status.yellow
  }

  if (statusCode >= 300) {
    return status.cyan
  }

  if (statusCode >= 200) {
    return status.green
  }

  return status.white
}

function requestLogger(req, res, next) {
  res.on('finish', () => {
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.url} - ${statusColors(res.statusCode)}`
    )
  })

  next()
}

function autenticar(req, res, next) {
  const token = req.headers['x-token']

  if (token !== '123456') {
    return res.status(401).json({ error: 'Token invalido. Acesso negado.' })
  }

  next()
}

module.exports = {
  statusColors,
  requestLogger,
  autenticar,
}