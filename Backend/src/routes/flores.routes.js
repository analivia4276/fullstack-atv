const express = require('express');
const router = express.Router();
const controller = require('../controller/flores.controller');

router.get('/produtos', controller.listar);
router.post('/produtos', controller.cadastrar);
router.put('/produtos/:id', controller.atualizar);
router.delete('/produtos/:id', controller.excluir);

module.exports = router;
