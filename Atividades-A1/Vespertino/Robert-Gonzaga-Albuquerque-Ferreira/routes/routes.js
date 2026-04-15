const router = require("express").Router();
const { listarAlunos, criarAluno } = require("../src/controller");

router.get("/", listarAlunos);
router.post("/", criarAluno);

module.exports = router;
