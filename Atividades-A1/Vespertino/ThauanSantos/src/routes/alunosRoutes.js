const express = require('express');
const router = express.Router();

const{
    listarAlunos,
    adicionarAluno
} = require('../modules/alunosModule')

//rota GET alunos, serve para listar todos os alunos
router.get('/', (req, res)=>{
    const lista = listarAlunos();
    res.status(200).json(lista);
});
//rota que servira para adicionar um novo aluno POST
router.post('/', (req, res)=>{
    console.log('POST /alunos content-type:', req.headers['content-type']);
    console.log('POST /alunos body:', req.body);

    const novoAluno = req.body; // pega os dados enviados no body

    // verifica se o nome foi enviado
    if (!novoAluno || !novoAluno.nome) {
        return res.status(400).json({ erro: 'Nome obrigatorio' });
    }

    const alunoCriado = adicionarAluno(novoAluno); // adicionar aluno usando modulo

    res.status(201).json(alunoCriado);
});

module.exports = router;