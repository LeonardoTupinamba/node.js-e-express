// src/routes/alunos.js
// Todas as rotas relacionadas a alunos

const express = require("express");
const router = express.Router();
const alunos = require("../data/alunos");
const { buscarAlunoPorId, buscarIndexPorId, gerarNovoId } = require("../modules/alunosHelper");

// GET /alunos - Lista todos os alunos
router.get("/", (req, res) => {
  res.status(200).json(alunos);
});

// GET /alunos/:id - Busca um aluno pelo ID
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`Parâmetro de rota recebido → id: ${id}`);

  const aluno = buscarAlunoPorId(alunos, id);

  if (!aluno) {
    return res.status(404).json({ erro: `Aluno com id ${id} não encontrado.` });
  }

  res.status(200).json(aluno);
});

// POST /alunos - Cria um novo aluno
router.post("/", (req, res) => {
  const { nome, curso, nota } = req.body;

  if (!nome || !curso) {
    return res.status(400).json({ erro: "Os campos 'nome' e 'curso' são obrigatórios." });
  }

  const novoAluno = {
    id: gerarNovoId(alunos),
    nome,
    curso,
    nota: nota ?? null,
  };

  alunos.push(novoAluno);
  res.status(201).json(novoAluno);
});

// PUT /alunos/:id - Atualiza um aluno existente
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const aluno = buscarAlunoPorId(alunos, id);

  if (!aluno) {
    return res.status(404).json({ erro: `Aluno com id ${id} não encontrado.` });
  }

  aluno.nome = req.body.nome || aluno.nome;
  aluno.curso = req.body.curso || aluno.curso;
  aluno.nota = req.body.nota !== undefined ? req.body.nota : aluno.nota;

  res.status(200).json(aluno);
});

// DELETE /alunos/:id - Remove um aluno
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = buscarIndexPorId(alunos, id);

  if (index === -1) {
    return res.status(404).json({ erro: `Aluno com id ${id} não encontrado.` });
  }

  alunos.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
