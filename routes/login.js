const express = require('express');
const router = express.Router();
const db = require('../models/tarefaModel');

// Rota de login
router.post('/', (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'Campos obrigatórios' });
  }

  const sql = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
  db.get(sql, [email, senha], (err, row) => {
    if (err) {
      console.error('Erro ao buscar usuário:', err);
      return res.status(500).json({ erro: 'Erro interno do servidor' });
    }

    if (row) {
      res.json({ autenticado: true });
    } else {
      res.status(401).json({ autenticado: false, mensagem: 'Credenciais inválidas' });
    }
  });
});

module.exports = router;

