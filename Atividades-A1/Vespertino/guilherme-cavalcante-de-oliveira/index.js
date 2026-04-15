const express = require('express')
const app = express()
const port = 3000
const alunosRoutes = require('./src/alunosRoutes')
const { requestLogger } = require('./src/middlewares.js')

app.use(express.json())

// middleware/logging
app.use(requestLogger)

// endpoint res enviando apenas texto, rota inicial da api;
app.get('/', (req, res) => {
  res.send('Bem-vindo a API de Alunos')
})

// rotas para o acesso dos endpoints
app.use('/alunos', alunosRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})