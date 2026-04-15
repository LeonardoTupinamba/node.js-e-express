let alunos = [
    {
        id: 1, nome: "Daniel"
    }
]

//função que pega os dados da variável let alunos
export const getAlunos = () =>{
    return alunos
}

//função de adição de aluno
export const addAluno = (nome) =>{
    const newAluno ={

        //-> percorre o array de aluno
        // vê qual é o ultimo e adicona +1 no final
        id: alunos.length + 1,
        nome
    }

    //adiciona o novo aluno
    alunos.push(newAluno)
    return newAluno
}

//função de atualização de aluno
export const atualizaAluno = (id, nome) =>{

    //.find() procura um item dentro do array

    /* na função (a => a.id === id)
        a é = cada aluno do array
        a.id === id => compara o id
        essa função em si “procura no array 
        um aluno que tenha o mesmo id
    */
    const aluno = alunos.find(a => a.id === id) 
    if (!aluno) return null

    aluno.nome = nome;
    return aluno
}

export const delAluno = (id) =>{
    const index = alunos.findIndex(a => a.id === id)
    if (index === -1) return false

    alunos.splice(index, 1)
    return true
}