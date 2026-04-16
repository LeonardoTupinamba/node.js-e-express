//array que armazena os alunos
let alunos = [];

function listarAlunos(){ // função para listar todos os alunos
    return alunos
}

function adicionarAluno(aluno){
    alunos.push(aluno); // adiciona no array
    return aluno;
}

// export as funções para usar em outros arquivos
module.exports ={
    listarAlunos,
    adicionarAluno
};