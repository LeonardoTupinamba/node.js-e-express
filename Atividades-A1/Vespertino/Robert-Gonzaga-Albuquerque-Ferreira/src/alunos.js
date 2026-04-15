let alunos = [];

function getAlunos() {
  return alunos;
}

function addAluno(aluno) {
  alunos.push(aluno);
}

module.exports = {
  getAlunos,
  addAluno,
};
