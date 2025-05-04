const db = require('../models/usuarioModel');

exports.login = (req, res) => {
  const { email, senha } = req.body;

  const sql = `SELECT * FROM usuarios WHERE email = ? AND senha = ?`;
  db.get(sql, [email, senha], (err, row) => {
    if (err) return res.status(500).json({ erro: 'Erro interno' });

    if (!row) return res.status(401).json({ erro: 'Credenciais inválidas' });

    res.status(200).json({ mensagem: 'Login realizado com sucesso' });
  });
};
