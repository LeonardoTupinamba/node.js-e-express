const express = require('express');
const router = express.Router();
const { listarAlunos, adicionarAluno, validarAluno } = require('../modules/alunos.module');

/**
 * GET /alunos
 * Lista todos os alunos cadastrados em memória.
 * Retorna status 200 com a lista de alunos.
 */
router.get('/', (req, res) => {
  const alunos = listarAlunos();

  return res.status(200).json({
    total: alunos.length,
    alunos,
  });
});

/**
 * POST /alunos
 * Cria um novo aluno a partir dos dados enviados no corpo da requisição (JSON).
 * Campos obrigatórios: nome (string), idade (number), curso (string).
 * Retorna status 201 com o aluno criado.
 */
router.post('/', (req, res) => {
  const { nome, idade, curso } = req.body;

  // Validação dos dados via módulo próprio
  const { valido, erros } = validarAluno({ nome, idade, curso });

  if (!valido) {
    return res.status(400).json({
      mensagem: 'Dados inválidos.',
      erros,
    });
  }

  const novoAluno = adicionarAluno(nome.trim(), idade, curso.trim());

  return res.status(201).json({
    mensagem: 'Aluno cadastrado com sucesso!',
    aluno: novoAluno,
  });
});

module.exports = router;
