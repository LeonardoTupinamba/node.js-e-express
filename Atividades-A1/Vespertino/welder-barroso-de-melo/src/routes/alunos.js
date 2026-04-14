const express = require("express");
const router = express.Router();
const { listarAlunos, adicionarAluno } = require("../data/alunos");

// GET /alunos → retorna 200 com a lista
router.get("/", (req, res) => {
  const lista = listarAlunos();
  res.status(200).json(lista);
});

// POST /alunos → retorna 201 com o aluno criado
router.post("/", (req, res) => {
  const { nome, curso } = req.body;

  if (!nome || !curso) {
    return res.status(400).json({ erro: "nome e curso são obrigatórios" });
  }

  const alunoCriado = adicionarAluno({ nome, curso });
  res.status(201).json(alunoCriado);
});

module.exports = router;
