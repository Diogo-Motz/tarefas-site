const express = require('express');
const router = express.Router();
const tarefaController = require('../controllers/tarefaController');

// Rotas da API
router.get('/', tarefaController.listar);
router.post('/', tarefaController.criar);
router.put('/:id', tarefaController.atualizar);
router.delete('/:id', tarefaController.excluir);

module.exports = router;

