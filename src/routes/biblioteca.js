
const express = require('express');
const router = express.Router();
const db = require ('../database');


router.get('/:id', (req, res) => {
    try{
        const { id } = req.params;
        
        const pesquisa = db.prepare('SELECT titulo FROM bibliotecas INNER JOIN jogos ON bibliotecas.id_jogo = jogos.id_jogo WHERE MAX(horas_jogadas)').all(id);

        res.status(200).json(pesquisa);

    }catch(erro){
        res.status(500).json({ erro: 'Erro ao buscar o jogo com mais horas jogadas'});
    }
});

router.post('/', (req, res) => {
    try {
        const {id_usuario, id_jogo, horas_jogadas} = req.body;
        const jogos = db.prepare('INSERT INTO bibliotecas (id_usuario, id_jogo, horas_jogadas) VALUES (?,?,?)').run(id_usuario, id_jogo, horas_jogadas);
        
        res.status(201).json({mensagem: 'Biblioteca adiconada', id: resultado.lastInsertRowid});

    }catch(erro){
        res.status(500).json({erro: "Erro ao adicionar biblioteca"});
    }
});

router.patch('/:id', (req, res) => {
    try{
        const { id } = req.params;
        const {hrs_jogadas, titulo} = req.body;
        const update = db.prepare('UPDATE jogos SET horas_jogadas = ? WHERE titulo = ? AND id_usuario = ?').run(hrs_jogadas, titulo, id);

        res.status(200).json({ mensagem: 'Biblioteca atualizado'});
    }catch(erro){
        res.status(500).json({erro: 'Erro ao atualizar biblioteca'});
    }
});

module.exports = router;





