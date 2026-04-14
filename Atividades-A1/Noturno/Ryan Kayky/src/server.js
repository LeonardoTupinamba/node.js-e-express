const express = require('express');
const { formatarDados } = require('./formatador');
const app = express();
const port = 3000;


app.use(express.json()); 


let alunos = [
  { id: 1, nome: "RYAN KAYKY" }
];


app.use((req, res, next) => {
  const hora = new Date().toISOString();
  console.log(`[${hora}] Nova requisição: ${req.method} na rota ${req.url}`);
  next();
});



app.get('/alunos', (req, res) => {
  res.status(200).json(alunos); 
});

app.post('/alunos', (req, res) => {
  const { nome } = req.body; 

  if (!nome) {
    return res.status(400).json({ erro: "O campo 'nome' é obrigatório." });
  }

  const novoAluno = {
    id: alunos.length + 1,
    nome: formatarDados(nome) 
  };

  alunos.push(novoAluno);
  res.status(201).json(novoAluno); 
});

app.put('/alunos/:id', (req, res) => {
  const { id } = req.params; // Captura o ID da URL
  const { nome } = req.body;

  const aluno = alunos.find(a => a.id == id);

  if (!aluno) {
    return res.status(404).json({ erro: "Aluno não encontrado" });
  }

  if (nome) {
    aluno.nome = formatarDados(nome); 
    return res.status(200).json(aluno); 
  }

  res.status(400).json({ erro: "Dados insuficientes para atualização" });
});

app.delete('/alunos/:id', (req, res) => {
  const { id } = req.params;
  const index = alunos.findIndex(a => a.id == id);

  if (index !== -1) {
    alunos.splice(index, 1);
    return res.status(200).json({ mensagem: "Aluno removido com sucesso" });
  }

  res.status(404).json({ erro: "Aluno não encontrado" });
});

app.listen(port, () => {
  console.log(`Servidor Nível 2 rodando em http://localhost:${port}`);
});