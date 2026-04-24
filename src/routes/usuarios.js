

const express = require('express');
const router = express.Router();
const db = require ('../database');


router.get('/:cpf', (req, res) => {
    try{
        const { cpf } = req.params;
        
        const pesquisa = db.prepare('SELECT * FROM usuarios WHERE cpf = ?').all(cpf);

        res.status(200).json(pesquisa);

    }catch(erro){
        res.status(500).json({ erro: 'Erro ao buscar o usuario pelo cpf'});
    }
});

router.post('/', (req, res) => {
    try {
        const {nome, cpf, email} = req.body;
        const users = db.prepare('INSERT INTO usuarios (nome, cpf, email) VALUES (?,?,?)').run(nome, cpf, email);
        
        res.status(201).json({mensagem: 'User adiiconado', id: resultado.lastInsertRowid});

    }catch(erro){
        res.status(500).json({erro: "Erro ao adicionar user"});
    }
});

router.put('/:id', (req, res) => {
    try{
        const { id } = req.params;
        const {nome, cpf, email} = req.body;
        const update = db.prepare('UPDATE usuarios SET nome = ?, cpf = ?, email = ?  WHERE id_usuario = ?').run(nome, cpf, email, id);

        res.status(200).json({ mensagem: 'User atualizado'});
    }catch(erro){
        res.status(500).json({erro: 'Erro ao atualizar User'});
    }
});

router.delete('/:id', (req, res) => {
    try{
        const { id } = req.params;
        const resultado = db.prepare('DELETE FROM usuarios WHERE id_usuario = ?').run(id);
        res.status(200).json({mensagem: 'Usuario excluido'});
    }catch(erro){
        res.status(500).json({erro: 'Erro ao excluir user'});
    }
});

module.exports = router;




