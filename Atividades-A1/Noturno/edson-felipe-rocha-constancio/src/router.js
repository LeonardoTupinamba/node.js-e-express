const express = require('express');
const Controller = require('./alunosController');

const router = express.Router();

router.get('/', Controller.listar);
router.post('/', Controller.criar);

module.exports = router;