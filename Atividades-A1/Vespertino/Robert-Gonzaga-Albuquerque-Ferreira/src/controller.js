const { getAlunos, addAluno } = require("./alunos");

function listarAlunos(req, res) {
  const alunos = getAlunos();
  res.status(200).json(alunos);
}

function criarAluno(req, res) {
  const novoAluno = req.body;

  if (!novoAluno.nome) {
    return res.status(400).json({ erro: "Nome é obrigatório" });
  }

  addAluno(novoAluno);
  res.status(201).json(novoAluno);
}

module.exports = {
  listarAlunos,
  criarAluno,
};
