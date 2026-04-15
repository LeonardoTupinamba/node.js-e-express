const alunos = [
    {id: 1, nome: "Guilherme"},
    {id: 2, nome: "Eric"},
    {id: 3, nome: "Gabriel"},
]

function listarAlunos() {
    return alunos
} 

function buscarAluno(id) {
    return alunos.find((aluno) => aluno.id === id) // .find serve pra buscar um elemento dentro da array e retornar;
}

function criarAluno(nome) {
    const novoId = alunos.length > 0 ? alunos[alunos.length - 1].id + 1 : 1 // varivavel do meu novo id, pelo oque eu entendi pega o ultimo elemento da array e soma +1. se nao apenas comeca pelo primeiro novoId disponivel;
    const novoAluno = {id: novoId, nome }

    alunos.push(novoAluno) // aqui estou adicionando novoAluno para dentro do meu array;
    return novoAluno
}

function atualizarAluno(id, nome) {
    const index = alunos.findIndex((aluno) => aluno.id === id)

    if (index === -1) {
        return null
    }

    alunos[index].nome = nome
    return alunos[index]
}
function deleteAluno(id) {
    const index = alunos.findIndex((aluno) => aluno.id === id)

    if (index === -1) {
        return null
    }
    alunos.splice(index, 1) // splice faz deletar, index é o inicio da posicao, 1= remove 1 item
    return true
}


module.exports = {
    listarAlunos,
    buscarAluno,
    criarAluno,
    atualizarAluno,
    deleteAluno,
}
