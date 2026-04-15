let alunos = [
    { id: 1, nome: 'João', idade: 20 },
    { id: 2, nome: 'Maria', idade: 22 },
    { id: 3, nome: 'Pedro', idade: 19 }
];

let proximoId = 4;

function getAlunos() {
    return alunos;
} 

function adicionar ({nome, idade}) {
    const novoAluno = {id: proximoId++, nome, idade};
    alunos.push(novoAluno);
    return novoAluno;
}   

module.exports = {
    getTodos: getAlunos,
    adicionar
};