const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');

// Cria a tabela se ainda não existir
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tarefas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      descricao TEXT,
      responsavel TEXT,
      prioridade TEXT,
      status TEXT,
      inicio DATETIME,
      fim DATETIME
    )
  `);
});

module.exports = db;
