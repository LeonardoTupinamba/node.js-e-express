// Módulo próprio: gerenciamento de alunos em memória
// Responsável pela lógica de negócio (separado das rotas)

const alunos = [];
let proximoId = 1;

/**
 * Retorna todos os alunos cadastrados.
 * @returns {Array} Lista de alunos
 */
function listarAlunos() {
  return alunos;
}

/**
 * Adiciona um novo aluno à lista em memória.
 * @param {string} nome - Nome do aluno
 * @param {number} idade - Idade do aluno
 * @param {string} curso - Curso do aluno
 * @returns {Object} Aluno criado
 */
function adicionarAluno(nome, idade, curso) {
  const novoAluno = {
    id: proximoId++,
    nome,
    idade,
    curso,
    criadoEm: new Date().toISOString(),
  };

  alunos.push(novoAluno);
  return novoAluno;
}

/**
 * Valida os campos obrigatórios de um aluno.
 * @param {Object} dados - Dados recebidos no corpo da requisição
 * @returns {{ valido: boolean, erros: string[] }}
 */
function validarAluno(dados) {
  const erros = [];

  if (!dados.nome || typeof dados.nome !== 'string' || dados.nome.trim() === '') {
    erros.push('O campo "nome" é obrigatório e deve ser uma string não vazia.');
  }

  if (dados.idade === undefined || typeof dados.idade !== 'number' || dados.idade <= 0) {
    erros.push('O campo "idade" é obrigatório e deve ser um número positivo.');
  }

  if (!dados.curso || typeof dados.curso !== 'string' || dados.curso.trim() === '') {
    erros.push('O campo "curso" é obrigatório e deve ser uma string não vazia.');
  }

  return {
    valido: erros.length === 0,
    erros,
  };
}

module.exports = { listarAlunos, adicionarAluno, validarAluno };
