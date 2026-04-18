let alunos = [
  { id: 1, nome: "Felipe" },
  { id: 2, nome: "Maria" },
  { id: 3, nome: "João" },
];

function proximoId() {
  return alunos.length > 0 ? Math.max(...alunos.map((aluno) => aluno.id)) + 1 : 1;
}

function listarAlunos() {
  return alunos;
}

function buscarAlunoPorId(id) {
  return alunos.find((aluno) => aluno.id === id);
}

function criarAluno(nome) {
  const aluno = { id: proximoId(), nome };
  alunos.push(aluno);
  return aluno;
}

function atualizarAluno(id, nome) {
  const aluno = buscarAlunoPorId(id);

  if (!aluno) {
    return null;
  }

  aluno.nome = nome;
  return aluno;
}

function removerAluno(id) {
  const index = alunos.findIndex((aluno) => aluno.id === id);

  if (index === -1) {
    return false;
  }

  alunos.splice(index, 1);
  return true;
}

module.exports = {
  listarAlunos,
  buscarAlunoPorId,
  criarAluno,
  atualizarAluno,
  removerAluno,
};