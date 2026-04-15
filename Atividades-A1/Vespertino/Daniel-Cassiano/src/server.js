import express from 'express'
const app = express()
import alunosRt from './routes/alunos.js'
import logger from './middlewares/logger.js';


app.use(express.json());

// Middleware de log
app.use(logger)

app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

app.use('/alunos', alunosRt)


app.listen(3000, () => {
  console.log("Servidor rodando...");
});