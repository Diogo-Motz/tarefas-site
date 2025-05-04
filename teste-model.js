    const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db/database.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS teste (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT
  )`);
});

console.log('✅ Teste de criação de tabela executado!');
