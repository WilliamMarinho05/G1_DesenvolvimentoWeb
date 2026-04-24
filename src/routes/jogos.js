

const express = require('express');
const router = express.Router();
const db = require ('../database');

router.get('/', (req, res) => {
    try{
        const jogos = db.prepare('SELECT * FROM jogos').all();
        res.status(200).json(jogos);
    }
    catch(erro){
        res.status(500).json({erro: 'Erro ao buscar os jogos'});
    }
});

router.get('/:preco', (req, res) => {
    try{
        const {preco} = req.params;
        
        const pesquisa = db.prepare('SELECT * FROM jogos WHERE preco < ?').all(preco);

        res.status(200).json(pesquisa);

    }catch(erro){
        res.status(500).json({ erro: 'Erro ao buscar jogos abaixo de determinado preço'});
    }
});

router.post('/', (req, res) => {
    try {
        const {titulo, preco, id_produtoras} = req.body;
        const jogos = db.prepare('INSERT INTO jogos (titulo, preco, id_produtora) VALUES (?,?,?)').run(titulo, preco, id_produtora);
        
        res.status(201).json({mensagem: 'Jogo adiiconado', id: resultado.lastInsertRowid});

    }catch(erro){
        res.status(500).json({erro: "Erro ao adicionar Jogo"});
    }
});

router.patch('/:id', (req, res) => {
    try{
        const { id } = req.params;
        const {preco} = req.body;
        const update = db.prepare('UPDATE jogos SET preco = ? WHERE id_jogo = ?').run(preco, id);

        res.status(200).json({ mensagem: 'Jogo atualizado'});
    }catch(erro){
        res.status(500).json({erro: 'Erro ao atualizar o preço do jogo'});
    }
});

module.exports = router;

