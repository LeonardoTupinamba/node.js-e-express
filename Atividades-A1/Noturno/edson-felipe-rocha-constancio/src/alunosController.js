const db = require('./db');

function listar (req,res) {
    const alunos = db.getTodos();
    res.status(200).json(alunos);
}

function criar (req,res) {
    const { nome, idade } = req.body;
    if (!nome || !idade) {
        return res.status(400).json({ error: 'Nome e idade são obrigatórios' });
    }
    const novoAluno = db.adicionar({ nome, idade });
    res.status(201).json(novoAluno);
}

module.exports = {listar, criar};