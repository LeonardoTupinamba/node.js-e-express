const express = require("express");
const app = express();

app.use(express.json());

const autenticar = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (token === "meu-token-secreto") {
    next();
  } else {
    res.status(401).json({ mensagem: "Acesso não autorizado" });
  }
};

app.get("/publica", (req, res) => {
  res.json({ mensagem: "Rota pública liberada" });
});

app.get("/admin", autenticar, (req, res) => {
  res.json({ mensagem: "Bem-vindo à área protegida" });
});



const autenticarBearer = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ mensagem: "Token não fornecido." });
  }

  // O header vem no formato "Bearer <token>".
  // Fazemos o split para pegar apenas o token.
  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    return res.status(401).json({ mensagem: "Erro no formato do token." });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ mensagem: "Token mal formatado." });
  }

  // Em um cenário real, aqui você validaria o token (ex: com JWT)
  if (token === "meu-token-secreto-bearer") {
    next(); // Token válido, pode seguir
  } else {
    res.status(401).json({ mensagem: "Token inválido." });
  }
};

app.get("/vendas", autenticarBearer, (req, res) => {
  res.json({ mensagem: "Área de vendas, acesso protegido por Bearer Token." });
});




app.listen(3000);