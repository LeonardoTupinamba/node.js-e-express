const express = require("express");
const {
  listarAlunos,
  buscarAlunoPorId,
  criarAluno,
  atualizarAluno,
  removerAluno,
} = require("./alunos");

const router = express.Router();

function autenticar(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const [, credentials] = authHeader.split(" ");

  if (!/^Basic$/i.test(authHeader.split(" ")[0] || "")) {
    return res.status(401).json({ error: "Autenticação básica requerida" });
  }

  const decoded = Buffer.from(credentials || "", "base64").toString("utf-8");
  const [username, password] = decoded.split(":");

  if (username !== "admin" || password !== "123456") {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  return next();
}

router.get("/", (req, res) => {
  res.status(200).json(listarAlunos());
});

router.get("/:id", (req, res) => {
  const aluno = buscarAlunoPorId(Number(req.params.id));

  if (!aluno) {
    return res.status(404).json({ error: "Aluno não encontrado" });
  }

  return res.status(200).json(aluno);
});

router.post("/", autenticar, (req, res) => {
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({ error: "Nome é obrigatório" });
  }

  const novoAluno = criarAluno(nome);
  return res.status(201).json(novoAluno);
});

router.put("/:id", autenticar, (req, res) => {
  const { nome } = req.body;
  const aluno = atualizarAluno(Number(req.params.id), nome);

  if (!aluno) {
    return res.status(404).json({ error: "Aluno não encontrado" });
  }

  return res.status(200).json(aluno);
});

router.delete("/:id", autenticar, (req, res) => {
  const removido = removerAluno(Number(req.params.id));

  if (!removido) {
    return res.status(404).json({ error: "Aluno não encontrado" });
  }

  return res.status(204).send();
});

module.exports = router;