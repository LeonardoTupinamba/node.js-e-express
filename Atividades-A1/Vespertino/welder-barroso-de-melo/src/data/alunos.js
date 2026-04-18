const alunos = [
  { id: 1, nome: "Ana Lima", curso: "Engenharia de Software" },
  { id: 2, nome: "Bruno Costa", curso: "Sistemas de Informação" },
];

function listarAlunos() {
  return alunos;
}

function adicionarAluno(novoAluno) {
  const aluno = {
    id: alunos.length + 1,
    ...novoAluno,
  };
  alunos.push(aluno);
  return aluno;
}

module.exports = { listarAlunos, adicionarAluno };
