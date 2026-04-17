const express = require("express");
const router = express.Router();
const { getAlunos, addAluno } = require("../modules/alunos");

router.get("/", (req, res) => {
  res.status(200).json(getAlunos());
});

router.post("/", (req, res) => {
  const aluno = req.body;

  if (!aluno.nome) {
    return res.status(400).json({ erro: "Nome é obrigatório" });
  }

  addAluno(aluno);
  res.status(201).json(aluno);
});

module.exports = router;