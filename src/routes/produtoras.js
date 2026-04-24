

const express = require('express');
const router = express.Router();
const db = require ('../database');

router.get('/', (req, res) => {
    try{
        const produtoras = db.prepare('SELECT * FROM produtoras').all();
        res.status(200).json(produtoras);
    }
    catch(erro){
        res.status(500).json({erro: 'Erro ao buscar as produtoras'});
    }
});

router.post('/', (req, res) => {
    try {
        const {nome, cnpj, website} = req.body;
        const produtoras = db.prepare('INSERT INTO produtoras (nome, cnpj, website) VALUES (?,?,?)').run(nome, cnpj, website);
        
        res.status(201).json({mensagem: 'Produtora adiiconada', id: resultado.lastInsertRowid});

    }catch(erro){
        res.status(500).json({erro: "Erro ao adicionar produtora"});
    }
});

module.exports = router;