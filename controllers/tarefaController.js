const db = require('../models/tarefaModel');

// Listar tarefas
exports.listar = (req, res) => {
  db.all('SELECT * FROM tarefas', [], (err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(rows);
  });
};

// Criar tarefa
exports.criar = (req, res) => {
  const { titulo, descricao, responsavel, prioridade, status, inicio, fim } = req.body;
  const sql = `
    INSERT INTO tarefas (titulo, descricao, responsavel, prioridade, status, inicio, fim)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [titulo, descricao, responsavel, prioridade, status, inicio, fim];
  db.run(sql, params, function(err) {
    if (err) return res.status(500).json({ erro: err.message });
    res.status(201).json({ id: this.lastID });
  });
};

// Atualizar tarefa
exports.atualizar = (req, res) => {
  const { titulo, descricao, responsavel, prioridade, status, inicio, fim } = req.body;
  const sql = `
    UPDATE tarefas SET titulo = ?, descricao = ?, responsavel = ?, prioridade = ?, status = ?, inicio = ?, fim = ?
    WHERE id = ?
  `;
  const params = [titulo, descricao, responsavel, prioridade, status, inicio, fim, req.params.id];
  db.run(sql, params, function(err) {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ mensagem: 'Tarefa atualizada com sucesso' });
  });
};

// Excluir tarefa
exports.excluir = (req, res) => {
  db.run('DELETE FROM tarefas WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ mensagem: 'Tarefa excluída com sucesso' });
  });
};
