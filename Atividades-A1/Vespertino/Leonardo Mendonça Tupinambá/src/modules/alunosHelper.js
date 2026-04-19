// src/modules/alunosHelper.js
// Módulo próprio com funções auxiliares para manipulação de alunos

function buscarAlunoPorId(alunos, id) {
  return alunos.find((a) => a.id === id);
}

function buscarIndexPorId(alunos, id) {
  return alunos.findIndex((a) => a.id === id);
}

function gerarNovoId(alunos) {
  if (alunos.length === 0) return 1;
  return Math.max(...alunos.map((a) => a.id)) + 1;
}

module.exports = { buscarAlunoPorId, buscarIndexPorId, gerarNovoId };
