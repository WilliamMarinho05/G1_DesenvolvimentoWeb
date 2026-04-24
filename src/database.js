const Database = require('better-sqlite3');
const db = new Database('database.db');


db.pragma('Foreign_keys = ON');

db.exec(`
    CREATE TABLE IF NOT EXISTS usuarios (
        id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        cpf TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE 
    )

`)

db.exec(`
    CREATE TABLE IF NOT EXISTS produtoras(
        id_produtora INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        cnpj TEXT NOT NULL,
        website TEXT 
    )    
    
`)

db.exec(`
    CREATE TABLE IF NOT EXISTS jogos(
        id_jogo INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        preco REAL NOT NULL,
        id_produtora INTEGER NOT NULL,

        FOREIGN KEY (id_produtora) REFERENCES produtoras(id_produtora)
    )

`)

db.exec(`
    CREATE TABLE IF NOT EXISTS bibliotecas (
        id_usuario INTEGER NOT NULL,
        id_jogo INTEGER NOT NULL,
        horas_jogadas INTEGER NOT NULL,
        PRIMARY KEY (id_usuario, id_jogo),
        FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
        FOREIGN KEY (id_jogo) REFERENCES jogos(id_jogo) ON DELETE CASCADE
    )
`)

console.log("Conexão com o banco, OK!");
module.exports = db;