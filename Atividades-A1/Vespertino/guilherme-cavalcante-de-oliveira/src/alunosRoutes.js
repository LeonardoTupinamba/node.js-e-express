const express = require('express')
const router = express.Router()  
const { listarAlunos, buscarAluno, criarAluno, atualizarAluno, deleteAluno } = require('./alunos') // fazendo minha requisicao do componente alunos, pegando todas as funcoes;
const { autenticar } = require('./middlewares.js')

router.get('/', (req, res) => {
  res.status(200).json(listarAlunos())
})

router.get('/:id', (req, res) => {
  const idAluno = Number(req.params.id)
  const aluno = buscarAluno(idAluno)

  if (!aluno) {
    return res.status(404).json({ error: 'aluno nao encontrado!' })
  }

  return res.status(200).json(aluno)
})

router.post('/', autenticar, (req, res) => {
  if (!req.body.nome) {
    return res.status(400).json({ error: 'O campo nome e obrigatorio.' })
  }

  const novoAluno = criarAluno(req.body.nome)
  return res.status(201).json(novoAluno)
})

router.put('/:id', autenticar, (req, res) => {
  const idAluno = Number(req.params.id)

  if (!req.body.nome) {
    return res.status(400).json({ error: 'o campo nome e obrigatorio.' })
  }

  const alunoAtualizado = atualizarAluno(idAluno, req.body.nome)

  if (!alunoAtualizado) {
    return res.status(404).json({ error: 'aluno nao encontrado!' })
  }

  return res.status(200).json(alunoAtualizado)
})
// DELETE
router.delete('/:id', autenticar, (req, res) => {
  const idAluno = Number(req.params.id)
  const alunoDeletado = deleteAluno(idAluno)

  if (!alunoDeletado) {
    return res.status(404).json({ error:'Aluno nao encontrado!' })
  }

  return res.status(200).send()
})

module.exports = router