import express from 'express'
const rt = express.Router()

import {
  getAlunos,
  addAluno,
  atualizaAluno,
  delAluno
} from '../data/alunosdb.js'

// get

rt.get('/', (req, res) => {
  res.status(200).json(getAlunos())
})

rt.post('/', (req, res) =>{
  const {nome} =req.body

  if(!nome){
    return res.status(400).json({erro: "Nome é obrigatório"})
  }

  const newAluno = addAluno(nome)
  res.status(201).json(newAluno)
})

//put

rt.put('/:id', (req, res) =>{
  const id = parseInt(req.params.id)
  const {nome} =  req.body

  const aluno = atualizaAluno(id, nome)

  if (!aluno){
    return res.status(404).json({erro: "Não encontrado"})
  }

  res.status(200).json(aluno)
})



rt.delete('/:id', (req, res) =>{
  const id = parseInt(req.params.id)

  const remover = delAluno(id)

  if (!remover) {
    return res.status(404).json({erro: "Não encontrado"})
  }

})

export default rt